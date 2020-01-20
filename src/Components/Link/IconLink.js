import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Utils
import Href                 from "../../Utils/Href";

// Components
import Icon                 from "../Common/Icon";

// Variants
const Variant = {
    LIGHT  : "light",
    DARK   : "dark",
    DARKER : "darker",
};



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
        outline: none;
    }
    &:hover {
        outline: none;
        background-color: var(--link-background, transparent);
    }

    ${(props) => props.variant === Variant.LIGHT && `
        --link-color: var(--primary-color);
        --link-background: rgba(0, 0, 0, 0.1);
    `}
    ${(props) => props.variant === Variant.DARK && `
        --link-color: white;
        --link-background: var(--primary-color);;
    `}
    ${(props) => props.variant === Variant.DARKER && `
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
    const { passedRef, variant, className, isDisabled, isSmall, target, icon } = props;
    
    return <Link
        ref={passedRef}
        className={`link ${className}`}
        variant={variant}
        isDisabled={isDisabled}
        isSmall={isSmall}
        href={Href.getUrl(props)}
        target={target}
        onClick={(e) => Href.handleClick(e, props)}
    >
        <Icon icon={icon} />
    </Link>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
IconLink.propTypes = {
    history    : PropTypes.object.isRequired,
    className  : PropTypes.string,
    variant    : PropTypes.string,
    href       : PropTypes.string,
    url        : PropTypes.string,
    target     : PropTypes.string,
    icon       : PropTypes.string,
    onClick    : PropTypes.func,
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
    className  : "",
    variant    : Variant.LIGHT,
    href       : "#",
    url        : "",
    target     : "_self",
    isDisabled : false,
    isSmall    : false,
    dontStop   : false,
};

export default withRouter(IconLink);
