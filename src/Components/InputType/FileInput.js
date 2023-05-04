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

    &:hover {
        border-color: var(--border-color);
    }
`;

const Div = Styled.div.attrs(({ hasLabel }) => ({ hasLabel }))`
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    font-size: var(--input-font);
    height: var(--input-height);
    padding: 4px 8px;
    color: var(--gray-color);
    cursor: pointer;

    ${(props) => props.hasLabel && `
        & {
            height: calc(var(--input-height) - 2px);
            padding-top: 16px !important;
        }
    `}
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

const Input = Styled.input`
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    opacity: 0;
    pointer-events: none;
`;



/**
 * The File Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function FileInput(props) {
    const {
        className, name, value, placeholder, tabIndex, onChange,
        onlyImages, hasLabel,
    } = props;

    const inputRef = React.useRef();

    // Handles the File Change
    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onChange(name, file);
        }
    };

    // Handles the Click
    const handleClick = (e) => {
        const node = inputRef.current;
        if (node) {
            // @ts-ignore
            node.click();
            e.preventDefault();
        }
    };


    return <Container className={className}>
        <Div
            hasLabel={hasLabel}
            onClick={handleClick}
        >
            {value ? value : <Placeholder>
                {NLS.get(placeholder || (onlyImages ? "GENERAL_SELECT_IMAGE" : "GENERAL_SELECT_FILE"))}
            </Placeholder>}
            <FileIcon icon="attachment" />
        </Div>
        <Input
            type="file"
            name={name}
            ref={inputRef}
            onChange={handleChange}
            tabIndex={tabIndex}
            accept={onlyImages ? "image/*" : ""}
        />
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
FileInput.propTypes = {
    className   : PropTypes.string,
    name        : PropTypes.string.isRequired,
    value       : PropTypes.any,
    placeholder : PropTypes.string,
    tabIndex    : PropTypes.string,
    onChange    : PropTypes.func.isRequired,
    onlyImages  : PropTypes.bool,
    hasLabel    : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
FileInput.defaultProps = {
    className  : "",
    onlyImages : false,
};

export default FileInput;
