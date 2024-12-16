import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";
import Responsive           from "../../Core/Responsive";
import Store                from "../../Core/Store";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.div.attrs(({ hideMobile, hasContent, isSelected }) => ({ hideMobile, hasContent, isSelected }))`
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
        color: var(--bicon-hover-color, var(--bicon-color));
        background-color: var(--bicon-hover-bg);
    }

    ${(props) => props.isSelected && `
        color: var(--bicon-hover-color, var(--bicon-color));
        background-color: var(--bicon-hover-bg);
    `}

    ${(props) => props.hideMobile && `
        @media (max-width: ${Responsive.WIDTH_FOR_MOBILE}px) {
            display: none;
        }
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
        passedRef, isHidden, hideMobile, className,
        isSelected, icon, withText, withTooltip, tooltipDelay,
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
    const shouldSelect = React.useMemo(() => {
        if (isSelected) {
            return isSelected;
        }
        if (url) {
            return isSelect(url, startsWith);
        }
        return false;
    }, [ isSelect, isSelected, url, startsWith ]);


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
    return <Container
        ref={elementRef}
        className={`baricon ${shouldSelect ? "selected" : ""} ${className}`}
        hideMobile={hideMobile}
        hasContent={hasContent}
        isSelected={shouldSelect}
        onClick={onClick}
        onMouseEnter={handleTooltip}
        onMouseLeave={hideTooltip}
    >
        <Icon icon={icon} />
        {hasContent && <Span className="baricon-text">
            {content}
        </Span>}
        {!!badge && <Badge className="baricon-badge">{badge}</Badge>}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarIcon.propTypes = {
    passedRef    : PropTypes.any,
    isHidden     : PropTypes.bool,
    hideMobile   : PropTypes.bool,
    className    : PropTypes.string,
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
    hideMobile   : false,
    className    : "",
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
