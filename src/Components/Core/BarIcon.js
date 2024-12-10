import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Store                from "../../Core/Store";
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

// Components
import { Brightness }       from "../../Core/Variants";
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div.attrs(({ variant, hasContent, isSelected }) => ({ variant, hasContent, isSelected }))`
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--bicon-size, 32px);
    width: ${(props) => props.hasContent ? "auto" : "var(--bicon-size, 32px)"};
    padding: ${(props) => props.hasContent ? "0 12px" : "0"};
    color: var(--bicon-color);
    background-color: var(--bicon-background);
    border-radius: var(--border-radius);
    font-size: var(--bicon-font, 16px);
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background-color: var(--bicon-hover);
    }

    ${(props) => props.variant === Brightness.LIGHT && `
        --bicon-color: var(--title-color);
        --bicon-background: rgba(0, 0, 0, 0.1);
        --bicon-hover: rgba(0, 0, 0, 0.2);
    `}

    ${(props) => props.variant === Brightness.DARK && `
        --bicon-color: white;
        --bicon-background: var(--primary-color);
        --bicon-hover: var(--secondary-color);
    `}
    ${(props) => props.variant === Brightness.DARK && props.isSelected && `
        --bicon-background: var(--secondary-color);
    `}

    ${(props) => props.variant === Brightness.DARKER && `
        --bicon-color: white;
        --bicon-background: var(--secondary-color);
        --bicon-hover: var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.DARKER && props.isSelected && `
        --bicon-background: var(--primary-color);
    `}

    ${(props) => props.variant === Brightness.ACCENT && `
        --bicon-color: white;
        --bicon-background: transparent;
        --bicon-hover: var(--accent-color);
    `}
    ${(props) => props.variant === Brightness.ACCENT && props.isSelected && `
        --bicon-background: var(--accent-color);
    `}
`;

const Span = Styled.span`
    font-size: 13px;
    margin-left: 6px;
`;

const Badge = Styled.span`
    position: absolute;
    top: 0;
    right: 0;
    padding: 2px 4px;
    font-size: 10px;
    color: white;
    background-color: #ff0033;
    border-radius: 9999px;
`;



/**
 * The Bar Icon Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarIcon(props) {
    const {
        passedRef, isHidden, className, variant, isSelected,
        icon, withText, withTooltip, tooltipDelay,
        message, url, startsWith, badge,
    } = props;

    const { showTooltip, hideTooltip } = Store.useAction("core");


    // Variables
    const defaultRef = React.useRef();
    const elementRef = passedRef || defaultRef;

    const onClick    = Navigate.useClick(props);
    const isSelect   = Navigate.useSelect();
    const hasContent = withText && !!message;
    const content    = NLS.get(message);


    // Returns true if the Menu should be selected
    const shouldSelect = () => {
        if (isSelected) {
            return isSelected;
        }
        if (url) {
            return isSelect(url, startsWith);
        }
        return false;
    };

    // Handles the Tooltip
    const handleTooltip = () => {
        if (withTooltip && window.innerWidth > 1000) {
            showTooltip(elementRef, "right", message, 0, tooltipDelay);
        }
    };


    // Do the Render
    if (isHidden) {
        return <React.Fragment />;
    }
    return <Div
        ref={elementRef}
        className={`baricon ${className}`}
        variant={variant}
        hasContent={hasContent}
        isSelected={shouldSelect()}
        onClick={onClick}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    >
        <Icon icon={icon} />
        {hasContent && <Span className="baricon-text">
            {content}
        </Span>}
        {!!badge && <Badge className="baricon-badge">
            {badge}
        </Badge>}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarIcon.propTypes = {
    passedRef    : PropTypes.any,
    isHidden     : PropTypes.bool,
    className    : PropTypes.string,
    variant      : PropTypes.string,
    isSelected   : PropTypes.bool,
    icon         : PropTypes.string.isRequired,
    message      : PropTypes.string,
    withText     : PropTypes.bool,
    withTooltip  : PropTypes.bool,
    tooltipDelay : PropTypes.number,
    href         : PropTypes.string,
    url          : PropTypes.string,
    target       : PropTypes.string,
    onClick      : PropTypes.func,
    startsWith   : PropTypes.bool,
    badge        : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
BarIcon.defaultProps = {
    isHidden     : false,
    className    : "",
    variant      : Brightness.LIGHT,
    isSelected   : false,
    withText     : false,
    withTooltip  : false,
    tooltipDelay : 1,
    href         : "",
    url          : "",
    target       : "_self",
    startsWith   : false,
};

export default BarIcon;
