import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Container = Styled.li.attrs(({ isSelected, isDisabled }) => ({ isSelected, isDisabled }))`
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
 * @param {object} props
 * @returns {React.ReactElement}
 */
function MenuTitle(props) {
    const { className, message } = props;


    // Do the Render
    return <Container className={className}>
        {NLS.get(message)}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
MenuTitle.propTypes = {
    className : PropTypes.string,
    message   : PropTypes.string,
    isTitle   : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
MenuTitle.defaultProps = {
    className : "",
    isTitle   : true,
};

export default MenuTitle;
