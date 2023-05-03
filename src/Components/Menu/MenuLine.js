import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Li = Styled.li.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
    height: 2px;
    width: auto;
    margin: 4px 8px;
    text-align: left;
    font-size: 13px;
    white-space: nowrap;
    background-color: var(--light-gray);
`;



/**
 * The Menu Line Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MenuLine(props) {
    const { className } = props;

    return <Li className={className} />;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MenuLine.propTypes = {
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MenuLine.defaultProps = {
    className : "",
};

export default MenuLine;
