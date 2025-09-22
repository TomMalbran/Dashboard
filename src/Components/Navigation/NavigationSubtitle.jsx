import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const H3 = Styled.h3`
    margin: 0;
    padding: 0 8px 8px 8px;
    font-size: 18px;
    font-weight: 200;
    color: white;
    font-family: var(--title-font);
    border-bottom: 1px solid var(--border-color-dark);

    &:not(:first-child) {
        padding-top: 16px;
    }
`;



/**
 * The Navigation Subtitle Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function NavigationSubtitle(props) {
    const { isHidden, className, message } = props;


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <H3 className={className}>
        {NLS.get(message)}
    </H3>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
NavigationSubtitle.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    message   : PropTypes.string.isRequired,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
NavigationSubtitle.defaultProps = {
    isHidden  : false,
    className : "",
};

export default NavigationSubtitle;
