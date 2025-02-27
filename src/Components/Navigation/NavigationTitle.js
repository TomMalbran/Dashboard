import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.header.attrs(({ variant }) => ({ variant }))`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: var(--header-height);
    padding: var(--navigation-title-padding, 12px 12px 10px 8px);

    ${(props) => props.variant === Brightness.DARK && `
        --navtitle-color: white;
        --navsubtitle-color: var(--darker-gray);
    `}
    ${(props) => props.variant === Brightness.LIGHT && `
        --navtitle-color: var(--title-color);
        --navsubtitle-color: var(--subtitle-color);
    `}
`;

const HeaderIcon = Styled(Icon)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 20px;
    color: var(--navtitle-color);
`;

const Title = Styled.h2`
    display: flex;
    flex-grow: 2;
    flex-direction: column;
    margin: 0;
    font-family: var(--title-font);
    font-size: 22px;
    font-weight: var(--title-font-weight);
    line-height: 1.2;
    letter-spacing: var(--title-letter-spacing);
    color: var(--navtitle-color);
`;

const Span1 = Styled.span`
    display: block;
    font-family: var(--main-font);
    font-size: 14px;
    font-weight: 400;
    color: var(--navsubtitle-color);
`;
const Span2 = Styled.span`
    display: block;
    font-size: 18px;
    color: var(--navtitle-color);
`;



/**
 * The Navigation Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationTitle(props) {
    const {
        className, variant, icon, href, message, fallback,
        onClick, noBack, onAction, canAdd, canEdit, canManage,
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


    // Do the Render
    return <Container className={className} variant={variant}>
        {!!icon && <HeaderIcon icon={icon} />}
        <IconLink
            isHidden={!!icon || noBack}
            variant={variant}
            icon="back"
            href={onClick ? null : (href || parent)}
            onClick={onClick}
            isSmall
        />

        <Title>
            {!message ? NLS.get(fallback) : <>
                <Span1>{NLS.get(fallback)}</Span1>
                <Span2>{NLS.get(message)}</Span2>
            </>}
        </Title>

        {canAdd && <IconLink
            variant={variant}
            icon="add"
            onClick={(e) => handleAction(e, "ADD")}
            isSmall
        />}
        {canEdit && <IconLink
            variant={variant}
            icon="edit"
            onClick={(e) => handleAction(e, "EDIT")}
            isSmall
        />}
        {canManage && <IconLink
            variant={variant}
            icon="settings"
            onClick={(e) => handleAction(e, "MANAGE")}
            isSmall
        />}
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
NavigationTitle.propTypes = {
    className : PropTypes.string,
    variant   : PropTypes.string,
    icon      : PropTypes.string,
    href      : PropTypes.string,
    message   : PropTypes.string,
    fallback  : PropTypes.string,
    noBack    : PropTypes.bool,
    onAction  : PropTypes.func,
    onClick   : PropTypes.func,
    canAdd    : PropTypes.bool,
    canEdit   : PropTypes.bool,
    canManage : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationTitle.defaultProps = {
    className : "",
    variant   : Brightness.DARK,
    icon      : "",
    href      : "",
    noBack    : false,
    canAdd    : false,
    canEdit   : false,
    canManage : false,
};

export default NavigationTitle;
