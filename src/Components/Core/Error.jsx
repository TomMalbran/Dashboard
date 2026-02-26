import React                from "react";
import Styled               from "styled-components";

// Core & Utils
import Store                from "../../Core/Store";
import Utils                from "../../Utils/Utils";

// Components
import ViewDialog           from "../Dialogs/ViewDialog";
import Html                 from "../Common/Html";



// Styles
const Container = Styled.div`
    border: 1px solid var(--input-border-color);
    border-radius: var(--border-radius);
    overflow: auto;
`;

const Content = Styled.div`
    padding: var(--main-gap);
`;

const Subtitle = Styled.h4`
    margin: 0;
    padding-bottom: calc(var(--main-gap) / 2);
`;


const RequestHeader = Styled.h3`
    margin: 0;
    padding: var(--main-gap) calc(var(--main-gap) * 1.5);
    display: flex;
    align-items: center;
    gap: var(--main-gap);
    color: white;
    background: #34495e;
`;

const RequestMethod = Styled.span`
    padding: 2px 8px;
    border-radius: var(--border-radius-small);
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    background: var(--success-color);
`;

const RequestUrl = Styled.p`
    margin: 0 0 var(--main-gap) 0;
    padding: var(--main-gap);
    border-left: 4px solid var(--success-color);
    border-radius: var(--border-radius-small);
    font-family: monospace;
    background: var(--lightest-gray);

    b {
        margin-right: 6px;
    }
`;

const RequestPayload = Styled(Html)`
    margin: 0;
    padding: var(--main-gap);
    font-size: var(--font-size);
    line-height: 1.5;
    border-radius: var(--border-radius-small);
    background: var(--lightest-gray);
    overflow-x: auto;
`;


const ErrorHeader = Styled.h3`
    margin: 0;
    padding: var(--main-gap) calc(var(--main-gap) * 1.5);
    color: white;
    background: var(--error-color);
`;

const ErrorTitle = Styled.h3`
    margin-top: 0;
    color: var(--error-color);
`;

const ErrorLocation = Styled.p`
    padding: var(--main-gap);
    border-left: 4px solid var(--error-color);
    border-radius: var(--border-radius-small);
    font-family: monospace;
    background: var(--lightest-gray);

    b {
        margin-right: 6px;
    }
`;

const ErrorStackTrace = Styled.div`
    font-family: monospace;
    font-size: 13px;
    color: #666;
    line-height: 1.6;
`;

const ErrorTrace = Styled.div`
    padding: 6px 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--input-border-color);
    }
    b {
        margin-right: 6px;
    }
    span {
        color: #999;
    }
`;

const ErrorLink = Styled.a`
    color: var(--font-color);
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;



/**
 * The Error Component
 * @returns {React.ReactElement}
 */
function Error() {
    const { error } = Store.useState("core");
    const { hideError } = Store.useAction("core");


    // Parse the Message
    const [ title, message, filePath, fileName, line, stackLines ] = React.useMemo(() => {
        if (!error.message) {
            return [ "", "", "", "", "", []];
        }

        // Parse the Title
        const titleMatch = error.message.match(/<b>(.*?)<\/b>\s*:/);
        const title      = titleMatch ? `PHP: ${titleMatch[1]}` : "GENERAL_ONE_ERROR";

        // Extract the Message, File and Line
        const mainRegex = /Uncaught Error: (.*?) in (.*?):(\d+)/;
        const match     = error.message.match(mainRegex);
        if (!match) {
            return [ title, error.message, "", "", "", []];
        }
        const [ , message, filePath, line ] = match;

        const segments = filePath.split("/").filter(Boolean);
        const fileName = segments.slice(3).join("/");

        // Extract the Stack Trace lines
        const stackLines = [];
        // const stackRegex = /#(\d+)\s+(.*?):\s+(.*)/g;
        const stackRegex = /#(\d+)\s+(.*?)\((\d+)\):\s+(.*)/g;
        let stackMatch;
        while ((stackMatch = stackRegex.exec(error.message)) !== null) {
            const segments = stackMatch[2].split("/").filter(Boolean);

            stackLines.push({
                id       : stackMatch[1],
                filePath : stackMatch[2],
                fileName : segments.slice(3).join("/"),
                line     : stackMatch[3],
                call     : stackMatch[4],
            });
        }

        return [ title, message, filePath, fileName, line, stackLines ];
    }, [ error.message ]);


    // Do the Render
    return <ViewDialog
        open={error.open}
        icon="error"
        title="GENERAL_ONE_ERROR"
        onClose={hideError}
        withSpacing
        isWide
    >
        <Container>
            <RequestHeader>
                <RequestMethod>{error.method}</RequestMethod>
                Request Context
            </RequestHeader>
            <Content>
                <Subtitle>Endpoint URL</Subtitle>
                <RequestUrl>{error.url}</RequestUrl>

                <Subtitle>Payload / Parameters</Subtitle>
                <RequestPayload
                    variant="pre"
                    content={Utils.jsonToHtml(error.payload)}
                />
            </Content>
        </Container>

        <Container>
            <ErrorHeader>
                {title.toUpperCase()}
            </ErrorHeader>
            <Content>
                <ErrorTitle>{message}</ErrorTitle>
                <ErrorLocation>
                    <b>IN</b>
                    <ErrorLink href={`vscode://file${filePath}:${line}`}>
                        /{fileName}:{line}
                    </ErrorLink>
                </ErrorLocation>

                <Subtitle>Stack Trace</Subtitle>
                <ErrorStackTrace>
                    {stackLines.map((step) => <ErrorTrace key={step.id}>
                        <b>#{step.id}</b>
                        <span>{step.call}</span><br/>
                        <ErrorLink href={`vscode://file${step.filePath}:${step.line}`}>
                            /{step.fileName}:{step.line}
                        </ErrorLink>
                    </ErrorTrace>)}
                </ErrorStackTrace>
            </Content>
        </Container>
    </ViewDialog>;
}

export default Error;
