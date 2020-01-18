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
    height: var(--input-height);
    width: 100%;
    border: 1px solid var(--lighter-color);
    border-radius: var(--border-radius);
`;

const Div = Styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    height: var(--input-height);
    padding: 4px 8px;
    border: 1px dashed var(--input-color);
    color: var(--gray-color);
    cursor: pointer;
`;

const FileIcon = Styled(Icon)`
    position: absolute;
    top: 6px;
    right: 8px;
    font-size: 20px;
    transform: rotate(45deg);
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
    const { className, value, placeholder, onClick } = props;

    return <Container className={className}>
        <Div onClick={onClick}>
            {value ? value : <Placeholder>
                {NLS.get(placeholder || "GENERAL_SELECT_FILE")}
            </Placeholder>}
            <FileIcon icon="attachment" />
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
    onClick     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MediaInput.defaultProps = {
    className : "",
};

export default MediaInput;
