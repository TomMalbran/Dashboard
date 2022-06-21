import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Brightness }       from "../../Core/Variants";
import Navigate             from "../../Core/Navigate";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Link = Styled.a.attrs(({ variant, isDisabled, isSmall }) => ({ variant, isDisabled, isSmall }))`
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: ${(props) => props.isSmall ? "16px" : "24px"};
    text-align: center;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    color: var(--link-color, black);

    &:focus {
        background-color: var(--link-background, transparent);
        outline: none;
    }
    &:hover {
        outline: none;
        background-color: var(--link-background, transparent);
    }

    ${(props) => props.variant === Brightness.LIGHT && `
        --link-color: var(--primary-color);
        --link-background: rgba(0, 0, 0, 0.1);
    `}
    ${(props) => props.variant === Brightness.DARK && `
        --link-color: white;
        --link-background: var(--primary-color);;
    `}
    ${(props) => props.variant === Brightness.DARKER && `
        --link-color: white;
        --link-background: var(--secondary-color);;
    `}

    ${(props) => props.isDisabled && `
        --link-color: var(--darker-gray);
        --link-background: transparent;
        cursor: not-allowed;
    `}
`;



/**
 * The IconLink Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function IconLink(props) {
    const {
        isHidden, passedRef, variant, className, isDisabled, isSmall,
        target, icon, onTouchEnd,
    } = props;

    if (isHidden) {
        return <React.Fragment />;
    }
    return <Link
        ref={passedRef}
        className={`link ${className}`}
        variant={variant}
        isDisabled={isDisabled}
        isSmall={isSmall}
        href={Navigate.getUrl(props)}
        target={target}
        onClick={Navigate.useLink(props)}
        onTouchEnd={onTouchEnd}
    >
        <Icon icon={icon} />
    </Link>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
IconLink.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    variant    : PropTypes.string,
    icon       : PropTypes.string,
    href       : PropTypes.string,
    url        : PropTypes.string,
    target     : PropTypes.string,
    isEmail    : PropTypes.bool,
    isPhone    : PropTypes.bool,
    isWhatsApp : PropTypes.bool,
    onClick    : PropTypes.func,
    onTouchEnd : PropTypes.func,
    isDisabled : PropTypes.bool,
    isSmall    : PropTypes.bool,
    dontStop   : PropTypes.bool,
    passedRef  : PropTypes.any,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
IconLink.defaultProps = {
    isHidden   : false,
    className  : "",
    variant    : Brightness.LIGHT,
    href       : "#",
    url        : "",
    target     : "_self",
    isEmail    : false,
    isPhone    : false,
    isWhatsApp : false,
    isDisabled : false,
    isSmall    : false,
    dontStop   : false,
};

export default IconLink;
