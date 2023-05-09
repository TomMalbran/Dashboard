import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.div`
    box-sizing: border-box;
    width: 100%;
    border: var(--input-border);
    border-radius: var(--border-radius);
    overflow: hidden;

    &:hover {
        border-color: var(--border-color);
    }
`;

const Textarea = Styled.textarea.attrs(({ hasLabel }) => ({ hasLabel }))`
    box-sizing: border-box;
    width: 100%;
    appearance: none;
    margin: 0;
    padding: var(--input-padding);
    border: none;
    resize: none;

    &:focus {
        outline: none;
    }

    ${(props) => props.hasLabel && `
        & {
            padding-top: 18px !important;
        }
    `}
`;

const Editor = Styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background-color: var(--lightest-gray);
    border-top: 1px dashed var(--input-border-color);

    .icon {
        box-shadow: none !important;
    }
`;

const Text = Styled.p`
    flex-grow: 2;
    margin: 0;
    padding-left: 8px;
    font-size: 12px;
    color: var(--lighter-color);
`;



/**
 * The Textarea Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextareaInput(props) {
    const {
        className, id, name, value, placeholder, rows, isDisabled,
        tabIndex, onChange, onInput, onFocus, onBlur, onKeyDown, onKeyUp,
        inputRef, hasLabel, counterText, children,
    } = props;

    const minRows = Number(rows) || 1;
    const [ actualRows, setActualRows ] = React.useState(minRows);


    // Handles the Input Change
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    // Handles the Textarea Input
    const handleInput = (e) => {
        handleAutogrow();
        if (onInput) {
            onInput(name, e.target.value);
        }
    };

    // Handles the Textarea Autogrow
    const handleAutogrow = () => {
        const textareaLineHeight = 18;
        const node     = inputRef.current;
        const prevRows = node.rows;
        node.rows = minRows;

        const currentRows = ~~(node.scrollHeight / textareaLineHeight);
        if (currentRows === prevRows) {
            node.rows = currentRows;
        }
        setActualRows(currentRows);
    };

    // Resize the Textarea the first time
    React.useEffect(() => {
        handleAutogrow();
    }, []);
    React.useEffect(() => {
        handleAutogrow();
    }, [ value ]);


    // Do the Render
    const hasFooter = Boolean(counterText || (children && children.length));

    return <Container className={className}>
        <Textarea
            className="input-textarea"
            id={id}
            ref={inputRef}
            name={name}
            value={value}
            rows={actualRows}
            placeholder={NLS.get(placeholder)}
            disabled={isDisabled}
            onInput={handleInput}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            tabIndex={tabIndex}
            hasLabel={hasLabel}
        />
        {hasFooter && <Editor>
            <Text>{NLS.format(counterText, value.length)}</Text>
            {!isDisabled && children}
        </Editor>}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TextareaInput.propTypes = {
    className   : PropTypes.string,
    id          : PropTypes.string,
    name        : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value       : PropTypes.any,
    rows        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    isDisabled  : PropTypes.bool,
    tabIndex    : PropTypes.string,
    onChange    : PropTypes.func,
    onInput     : PropTypes.func,
    onFocus     : PropTypes.func,
    onBlur      : PropTypes.func,
    onKeyDown   : PropTypes.func,
    onKeyUp     : PropTypes.func,
    inputRef    : PropTypes.object,
    hasLabel    : PropTypes.bool,
    counterText : PropTypes.string,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TextareaInput.defaultProps = {
    className   : "",
    placeholder : "",
};

export default TextareaInput;
