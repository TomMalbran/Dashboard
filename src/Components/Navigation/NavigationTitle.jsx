import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.header.attrs(({ smallNav }) => ({ smallNav }))`
    flex-shrink: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: var(--header-height);
    padding: var(--navigation-title-padding, 12px 12px 10px 8px);
    z-index: 1;

    ${(props) => props.smallNav && `
        --navigation-title-icon: 24px;
        justify-content: center;
        padding-left: 0;
        padding-right: 4px;
        gap: 0;
    `}
`;

const HeaderIcon = Styled(Icon)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: var(--navigation-title-icon, 20px);
    color: var(--navigation-title-color, var(--title-color));
`;

const Title = Styled.h2`
    display: flex;
    flex-grow: 2;
    flex-direction: column;
    margin: 0;
    font-family: var(--title-font);
    font-size: var(--title-font-size);
    font-weight: var(--title-font-weight);
    line-height: 1.2;
    letter-spacing: var(--title-letter-spacing);
    color: var(--navigation-title-color, var(--title-color));
`;

const Span1 = Styled.span`
    display: block;
    font-family: var(--main-font);
    font-size: 14px;
    font-weight: 400;
    color: var(--navigation-subtitle-color, var(--subtitle-color));
`;

const Span2 = Styled.span`
    display: block;
    font-size: 18px;
    color: var(--navigation-title-color, var(--title-color));
`;



/**
 * The Navigation Title Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function NavigationTitle(props) {
    const {
        className, icon, href, message, fallback,
        smallNav, canAdd, canEdit, canManage,
        noBack, onClick, onAction,
    } = props;

    const parent = Navigate.useParent();


    // Handles the Action
    const handleAction = (e, action) => {
        if (onAction) {
            onAction(Action.get(action));
        }
        e.stopPropagation();
        e.preventDefault();
    };


    // Variables
    const showLink   = (!icon || smallNav) && !noBack;
    const showTitle  = !smallNav;
    const showAdd    = canAdd && !smallNav;
    const showEdit   = canEdit && !smallNav;
    const showManage = canManage && !smallNav;


    // Do the Render
    return <Container className={`navigation-title ${className}`} smallNav={smallNav}>
        <IconLink
            isHidden={!showLink}
            icon="back"
            href={onClick ? null : (href || parent)}
            onClick={onClick}
            isSmall
        />
        {!!icon && <HeaderIcon icon={icon} />}

        {showTitle && <Title>
            {!message ? NLS.get(fallback) : <>
                <Span1>{NLS.get(fallback)}</Span1>
                <Span2>{NLS.get(message)}</Span2>
            </>}
        </Title>}

        {showAdd && <IconLink
            icon="add"
            onClick={(e) => handleAction(e, "ADD")}
            isSmall
        />}
        {showEdit && <IconLink
            icon="edit"
            onClick={(e) => handleAction(e, "EDIT")}
            isSmall
        />}
        {showManage && <IconLink
            icon="settings"
            onClick={(e) => handleAction(e, "MANAGE")}
            isSmall
        />}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
NavigationTitle.propTypes = {
    className : PropTypes.string,
    icon      : PropTypes.string,
    href      : PropTypes.string,
    message   : PropTypes.string,
    fallback  : PropTypes.string,
    smallNav  : PropTypes.bool,
    canAdd    : PropTypes.bool,
    canEdit   : PropTypes.bool,
    canManage : PropTypes.bool,
    noBack    : PropTypes.bool,
    onAction  : PropTypes.func,
    onClick   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
NavigationTitle.defaultProps = {
    className : "",
    icon      : "",
    href      : "",
    smallNav  : false,
    canAdd    : false,
    canEdit   : false,
    canManage : false,
    noBack    : false,
};

export default NavigationTitle;
