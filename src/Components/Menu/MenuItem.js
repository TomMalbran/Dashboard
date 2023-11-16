import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

// Components
import Menu                 from "./Menu";
import Icon                 from "../Common/Icon";



// Styles
const Li = Styled.li.attrs(({ isSelected, isDisabled, isSmall }) => ({ isSelected, isDisabled, isSmall }))`
    display: flex;
    align-items: center;
    gap: 6px;
    width: auto;
    min-width: 50px;
    margin: 0;
    padding: 8px;
    text-align: left;
    font-size: 14px;
    white-space: nowrap;
    color: var(--title-color);
    border-radius: var(--border-radius);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: var(--light-gray);
    }
    .icon {
        font-size: 20px;
    }

    ${(props) => props.isSmall && `
        gap: 4px;
        padding: 4px 8px;
        font-size: 13px;
    `}
    ${(props) => props.isSelected && `
        background-color: var(--light-gray);
    `}
`;



/**
 * The Menu Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MenuItem(props) {
    const {
        className, action, icon, title, message, url, href, target,
        isDisabled, isSelected, isSmall, onAction, onClick, onClose,
        direction, index, selectedIdx, trigger, setTrigger, children,
    } = props;


    // Variables
    const act         = Action.get(action);
    const icn         = icon    || act.icon;
    const content     = message || act.message;
    const uri         = url ? NLS.baseUrl(url) : href;
    const navigate    = Navigate.useUrl(uri, target);
    const isSelection = !isDisabled && (isSelected || selectedIdx === index);
    const hasMenu     = Boolean(children && children.length);

    // The References
    const itemRef = React.useRef();

    // The Current State
    const [ menuOpen, setMenuOpen ] = React.useState(false);


    // Handles the Trigger
    React.useEffect(() => {
        if (trigger && isSelection) {
            handleAction();
            setTrigger(false);
        }
    }, [ trigger ]);

    // Handles the Click
    const handleClick = (e) => {
        handleAction();
        e.preventDefault();
        e.stopPropagation();
    };

    // Handles the Action
    const handleAction = () => {
        if (url) {
            navigate();
        }
        if (onAction) {
            onAction(act);
        } else if (onClick) {
            onClick();
        }
        if (!hasMenu && onClose) {
            onClose();
        }
    };


    // Do the Render
    return <>
        <Li
            ref={itemRef}
            className={className}
            isSelected={isSelection}
            isDisabled={isDisabled}
            isSmall={isSmall}
            onMouseDown={handleClick}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
        >
            {!!icn && <Icon icon={icn} />}
            {!!title && <b>{NLS.get(title)}</b>}
            {NLS.get(content)}
        </Li>

        {hasMenu && <Menu
            open={menuOpen}
            targetRef={itemRef}
            direction={direction}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onClose={onClose}
            isSubmenu
        >
            {children}
        </Menu>}
    </>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MenuItem.propTypes = {
    className   : PropTypes.string,
    action      : PropTypes.string,
    icon        : PropTypes.string,
    title       : PropTypes.string,
    message     : PropTypes.string,
    url         : PropTypes.string,
    href        : PropTypes.string,
    target      : PropTypes.string,
    isDisabled  : PropTypes.bool,
    isSelected  : PropTypes.bool,
    isSmall     : PropTypes.bool,
    onAction    : PropTypes.func,
    onClick     : PropTypes.func,
    onClose     : PropTypes.func,
    direction   : PropTypes.string,
    index       : PropTypes.number,
    selectedIdx : PropTypes.number,
    trigger     : PropTypes.bool,
    setTrigger  : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MenuItem.defaultProps = {
    className  : "",
    target     : "_self",
    isDisabled : false,
    isSelected : false,
    isSmall    : false,
    direction  : "right",
};

export default MenuItem;
