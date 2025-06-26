import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Html                 from "../Common/Html";



// Styles
const Container = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
    margin: 0;
    padding: 8px;
    font-size: 14px;
    color: var(--title-color);
    border-radius: var(--border-radius);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: var(--light-gray);
    }

    ${(props) => props.isSelected && `
        background-color: var(--primary-color);
        color: white;
        &:hover {
            background-color: var(--primary-color);
        }
    `}
`;

const Description = Styled(Html).attrs(({ isSelected }) => ({ isSelected }))`
    color: var(--font-lightest);
    font-size: 13px;
    margin-top: 4px;

    ${(props) => props.isSelected && `
        color: rgba(255, 255, 255, 0.8);
    `}
`;



/**
 * The Input Option Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputOption(props) {
    const { className, content, description, isSelected, onMouseDown } = props;


    // Do the Render
    return <Container
        className={className}
        content={content}
        isSelected={isSelected}
        onMouseDown={onMouseDown}
    >
        <Html content={content} />
        <Description content={description} isSelected={isSelected} />
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputOption.propTypes = {
    className   : PropTypes.string,
    content     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    description : PropTypes.string,
    isSelected  : PropTypes.bool,
    onMouseDown : PropTypes.func,
};

export default InputOption;
