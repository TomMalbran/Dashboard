import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    & + & {
        margin-top: 32px;
    }
`;

const Li = Styled.li.attrs(({ variant }) => ({ variant }))`
    font-size: 16px;
    padding: 4px;
    margin-bottom: 8px;

    ${(props) => props.variant === Brightness.DARK && `
        border-bottom: 2px solid var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.LIGHT && `
        border-bottom: 2px solid var(--darker-gray);
    `}
`;



/**
 * The Navigation List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationList(props) {
    const { className, message, variant, onAction, onClose, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        variant, onAction, onClose,
    }));


    // Do the Render
    return <Ul className={className}>
        {!!message && <Li variant={variant}>{NLS.get(message)}</Li>}
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationList.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    message   : PropTypes.string,
    variant   : PropTypes.string,
    onAction  : PropTypes.func,
    onClose   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
NavigationList.defaultProps = {
    isHidden  : false,
    className : "",
    message   : "",
};

export default NavigationList;
