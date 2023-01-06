import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

// Components
import { Brightness }       from "../../Core/Variants";
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div.attrs(({ variant, hasContent, isSelected }) => ({ variant, hasContent, isSelected }))`
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
    &:hover .tooltip {
        visibility: visible;
        transform: translateY(-50%) scale(1);
    }
    &:hover .tooltip::before {
        opacity: 1;
    }

    ${(props) => props.variant === Brightness.DARK && `
        --bicon-color: white;
        --bicon-tooltip: var(--secondary-color);
        --bicon-background: var(--primary-color);
        --bicon-hover: var(--secondary-color);
    `}
    ${(props) => props.variant === Brightness.DARK && props.isSelected && `
        --bicon-background: var(--secondary-color);
    `}

    ${(props) => props.variant === Brightness.DARKER && `
        --bicon-color: white;
        --bicon-tooltip: var(--primary-color);
        --bicon-background: var(--secondary-color);
        --bicon-hover: var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.DARKER && props.isSelected && `
        --bicon-background: var(--primary-color);
    `}

    ${(props) => props.variant === Brightness.LIGHT && `
        --bicon-color: var(--title-color);
        --bicon-tooltip: rgba(0, 0, 0, 0.1);
        --bicon-background: rgba(0, 0, 0, 0.1);
        --bicon-hover: white;
    `}
`;
const Span = Styled.span`
    font-size: 13px;
    margin-left: 6px;
`;

const Tooltip = Styled.div`
    position: absolute;
    top: 50%;
    left: calc(100% + 8px);
    visibility: hidden;
    box-sizing: border-box;
    padding: 5px 8px;
    font-size: 13px;
    font-weight: 200;
    line-height: 1.5em;
    color: #fff;
    white-space: normal;
    word-wrap: break-word;
    border-radius: var(--border-radius);
    background-color: var(--bicon-tooltip);
    transform: translateY(-50%) scale(.8);
    transition: transform .2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    pointer-events: none;
    z-index: 100;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -12px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        opacity: 0;
        border-color: transparent var(--bicon-tooltip) transparent transparent;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 100;
    }
`;



/**
 * The Bar Icon Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarIcon(props) {
    const {
        isHidden, className, variant, isSelected,
        icon, withText, withTooltip, message, url, startsWith,
    } = props;

    const onClick    = Navigate.useClick(props);
    const isSelect   = Navigate.useSelect();
    const hasContent = withText && !!message;
    const hasTooltip = withTooltip && !!message;
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


    if (isHidden) {
        return <React.Fragment />;
    }
    return <Div
        className={className}
        variant={variant}
        hasContent={hasContent}
        isSelected={shouldSelect()}
        onClick={onClick}
    >
        <Icon icon={icon} />
        {hasContent && <Span>{content}</Span>}
        {hasTooltip && <Tooltip className="tooltip">{content}</Tooltip>}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarIcon.propTypes = {
    isHidden    : PropTypes.bool,
    className   : PropTypes.string,
    variant     : PropTypes.string,
    isSelected  : PropTypes.bool,
    icon        : PropTypes.string.isRequired,
    message     : PropTypes.string,
    withText    : PropTypes.bool,
    withTooltip : PropTypes.bool,
    href        : PropTypes.string,
    url         : PropTypes.string,
    target      : PropTypes.string,
    onClick     : PropTypes.func,
    startsWith  : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
BarIcon.defaultProps = {
    isHidden    : false,
    className   : "",
    variant     : Brightness.LIGHT,
    isSelected  : false,
    withText    : false,
    withTooltip : false,
    href        : "",
    url         : "",
    target      : "_self",
    startsWith  : false,
};

export default BarIcon;
