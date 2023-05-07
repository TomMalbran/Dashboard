import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.section`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
`;

const Text = Styled.p`
    flex-grow: 2;
    margin: 0;
    padding-left: 8px;
    font-size: 12px;
    color: var(--lighter-color);
`;



/**
 * The Text Editor Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TextEditor(props) {
    const { className, message, children } = props;

    return <Container className={className}>
        <Text>{NLS.get(message)}</Text>
        {children}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TextEditor.propTypes = {
    className : PropTypes.string,
    message   : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
TextEditor.defaultProps = {
    className : "",
};

export default TextEditor;
