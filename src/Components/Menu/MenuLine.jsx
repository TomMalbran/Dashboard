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
 * @param {object} props
 * @returns {React.ReactElement}
 */
function MenuLine(props) {
    const { isHidden, className } = props;


    // Do the Render
    if (isHidden) {
        return null;
    }
    return <Li className={className} />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
MenuLine.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
MenuLine.defaultProps = {
    isHidden  : false,
    className : "",
};

export default MenuLine;
