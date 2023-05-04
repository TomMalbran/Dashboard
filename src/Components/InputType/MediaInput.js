import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
`;

const Div = Styled.div.attrs(({ hasLabel }) => ({ hasLabel }))`
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    height: var(--input-height);
    padding: 4px 8px;
    border: 1px dashed var(--input-color);
    color: var(--gray-color);
    white-space: nowrap;
    cursor: pointer;

    ${(props) => props.hasLabel && `
        & {
            height: calc(var(--input-height) - 2px);
            padding-top: 16px !important;
        }
    `}
`;

const IconDiv = Styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    width: 32px;
`;

const FileIcon = Styled(Icon)`
    position: absolute;
    top: 50%;
    right: 8px;
    font-size: 20px;
    transform: translateY(-50%) rotate(45deg);
`;

const Placeholder = Styled.span`
    color: var(--title-color);
`;



/**
 * The Media Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MediaInput(props) {
    const { className, value, placeholder, hasLabel, onClick } = props;

    return <Container className={className}>
        <Div
            hasLabel={hasLabel}
            onClick={onClick}
        >
            {value ? value : <Placeholder>
                {NLS.get(placeholder || "GENERAL_SELECT_FILE")}
            </Placeholder>}
            <IconDiv><FileIcon icon="attachment" /></IconDiv>
        </Div>
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MediaInput.propTypes = {
    className   : PropTypes.string,
    value       : PropTypes.any,
    placeholder : PropTypes.string,
    hasLabel    : PropTypes.bool,
    onClick     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MediaInput.defaultProps = {
    className   : "",
    placeholder : "",
};

export default MediaInput;
