import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Li = Styled.li.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
    display: flex;
    align-items: center;
    width: auto;
    margin: 0;
    padding: 8px 8px 4px 8px;
    text-align: left;
    font-size: 12px;
    white-space: nowrap;
    color: var(--font-lighter);
`;



/**
 * The Menu Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MenuTitle(props) {
    const { className, message } = props;

    return <Li className={className}>
        {NLS.get(message)}
    </Li>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MenuTitle.propTypes = {
    className : PropTypes.string,
    message   : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MenuTitle.defaultProps = {
    className : "",
};

export default MenuTitle;
