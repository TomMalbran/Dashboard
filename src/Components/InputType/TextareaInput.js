import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import InputContent         from "../Input/InputContent";



// Styles
const Container = Styled.div`
    box-sizing: border-box;
    width: 100%;
    border-radius: var(--border-radius);
    overflow: hidden;
`;

const Textarea = Styled.textarea`
    box-sizing: border-box;
    display: block;
    width: 100%;
    appearance: none;
    margin: 0;
    padding: var(--input-padding);
    padding-top: 0px;
    padding-bottom: 8px;
    font-size: 14px;
    line-height: 16px;
    border: none;
    resize: none;

    &:focus {
        outline: none;
    }
    &:disabled {
        color: var(--input-disabled-color);
        background: white;
    }
    &::placeholder {
        color: var(--lighter-color);
    }
`;

const Editor = Styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background-color: var(--lightest-gray);
    border-top: 1px dashed var(--input-border-color);
`;

const Text = Styled.p`
    flex-grow: 2;
    margin: 0;
    padding-left: 4px;
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
        inputRef, className, isFocused, isDisabled, withLabel,
        id, name, value, placeholder, rows,
        onChange, onInput, onFocus, onBlur, onKeyDown, onKeyUp,
        maxLength, children,
    } = props;

    const minRows = Number(rows) || 1;
    const [ actualRows, setActualRows ] = React.useState(minRows);


    // Handles the Input Change
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    // Handles the Textarea Input
    const handleInput = (e) => {
        handleAutoGrow();
        if (onInput) {
            onInput(name, e.target.value);
        }
    };

    // Handles the Textarea AutoGrow
    const handleAutoGrow = () => {
        const textareaLineHeight = 16;
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
        handleAutoGrow();
    }, []);

    React.useEffect(() => {
        handleAutoGrow();
    }, [ value ]);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([ entry ]) => {
            if (inputRef.current && entry.isIntersecting) {
                handleAutoGrow();
            }
        });
        observer.observe(inputRef.current);
        return () => {
            observer.disconnect();
        };
    }, [ inputRef ]);



    // Do the Render
    const hasFooter   = Boolean(maxLength || (children && children.length));
    const counterText = maxLength ? "GENERAL_CHARACTERS_MAX" : "GENERAL_CHARACTERS";
    const characters  = String(String(value || "").length);

    return <InputContent
        inputRef={inputRef}
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        withLabel={withLabel}
        withBorder
    >
        <Container>
            <Textarea
                ref={inputRef}
                className="input-textarea"
                id={id}
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
            />
            {hasFooter && <Editor>
                <Text>{NLS.format(counterText, characters, maxLength)}</Text>
                {!isDisabled && children}
            </Editor>}
        </Container>
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TextareaInput.propTypes = {
    inputRef    : PropTypes.any,
    className   : PropTypes.string,
    isFocused   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    withLabel   : PropTypes.bool,
    id          : PropTypes.string,
    name        : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    value       : PropTypes.any,
    rows        : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    maxLength   : PropTypes.number,
    onChange    : PropTypes.func,
    onInput     : PropTypes.func,
    onFocus     : PropTypes.func,
    onBlur      : PropTypes.func,
    onKeyDown   : PropTypes.func,
    onKeyUp     : PropTypes.func,
    counterText : PropTypes.string,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TextareaInput.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    placeholder : "",
    maxLength   : 0,
};

export default TextareaInput;
