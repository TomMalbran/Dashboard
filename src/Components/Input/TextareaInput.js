import React                from "react";
import PropTypes            from "prop-types";

// Core
import NLS                  from "../../Core/NLS";



/**
 * The Textarea Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextareaInput(props) {
    const {
        className, id, name, value, placeholder, rows, isDisabled,
        tabIndex, onChange, onInput, onFocus, onBlur, onKeyDown, onKeyUp,
        inputRef,
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


    return <textarea
        className={`input input-textarea ${className}`}
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
    />;
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
