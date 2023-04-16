import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

// Components
import { Brightness }       from "../../Core/Variants";
import Icon                 from "../Common/Icon";
import Tooltip              from "../Common/Tooltip";



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
    &:hover .tooltip {
        visibility: visible;
        transform: translateY(-50%) scale(1);
    }
    &:hover .tooltip::before {
        opacity: 1;
    }

    ${(props) => props.variant === Brightness.LIGHT && `
        --bicon-color: var(--title-color);
        --bicon-background: rgba(0, 0, 0, 0.1);
        --bicon-hover: rgba(0, 0, 0, 0.2);
        --tooltip-color: rgba(0, 0, 0, 0.1);
    `}
    ${(props) => props.variant === Brightness.DARK && `
        --bicon-color: white;
        --bicon-background: var(--primary-color);
        --bicon-hover: var(--secondary-color);
        --tooltip-color: var(--secondary-color);
    `}
    ${(props) => props.variant === Brightness.DARK && props.isSelected && `
        --bicon-background: var(--secondary-color);
    `}

    ${(props) => props.variant === Brightness.DARKER && `
        --bicon-color: white;
        --bicon-background: var(--secondary-color);
        --bicon-hover: var(--primary-color);
        --tooltip-color: var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.DARKER && props.isSelected && `
        --bicon-background: var(--primary-color);
    `}
`;
const Span = Styled.span`
    font-size: 13px;
    margin-left: 6px;
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
        className={`baricon ${className}`}
        variant={variant}
        hasContent={hasContent}
        isSelected={shouldSelect()}
        onClick={onClick}
    >
        <Icon icon={icon} />
        {hasContent && <Span className="baricon-text">
            {content}
        </Span>}
        <Tooltip isHidden={!withTooltip} message={message} />
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
