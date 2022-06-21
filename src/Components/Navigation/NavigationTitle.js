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



// Styles
const Header = Styled.header.attrs(({ variant }) => ({ variant }))`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    min-height: var(--header-height);
    padding: 18px 12px 10px 8px;

    ${(props) => props.variant === Brightness.DARK && `
        --navtitle-color: white;
        --navsubtitle-color: var(--lightest-color);
    `}
    ${(props) => props.variant === Brightness.LIGHT && `
        --navtitle-color: var(--title-color);
        --navsubtitle-color: var(--subtitle-color);
    `}
`;

const H2 = Styled.h2`
    display: flex;
    align-items: center;
    margin: 0;
    font-family: var(--title-font);
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: 1px;
    color: var(--navtitle-color);
`;
const Link = Styled(IconLink)`
    flex-shrink: 0;
`;

const Div = Styled.div`
    margin-left: 8px;
    font-weight: 400;
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
    font-size: 20px;
    color: var(--navtitle-color);
`;



/**
 * The Navigation Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationTitle(props) {
    const {
        className, variant, href, message, fallback,
        onAction, canAdd, canManage,
    } = props;

    // Handles the Action
    const handleAction = (e, action) => {
        if (onAction) {
            onAction(Action.get(action));
        }
        e.stopPropagation();
        e.preventDefault();
    };


    return <Header className={className} variant={variant}>
        <H2>
            <Link
                variant={variant}
                icon="back"
                href={href || Navigate.getParent()}
            />
            {!message ? NLS.get(fallback) : <Div>
                <Span1>{NLS.get(fallback)}</Span1>
                <Span2>{NLS.get(message)}</Span2>
            </Div>}
        </H2>
        {canAdd && <IconLink
            variant={variant}
            icon="add"
            onClick={(e) => handleAction(e, "ADD")}
        />}
        {canManage && <IconLink
            variant={variant}
            icon="settings"
            onClick={(e) => handleAction(e, "MANAGE")}
        />}
    </Header>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
NavigationTitle.propTypes = {
    className : PropTypes.string,
    variant   : PropTypes.string,
    href      : PropTypes.string,
    message   : PropTypes.string,
    fallback  : PropTypes.string,
    onAction  : PropTypes.func,
    canAdd    : PropTypes.bool,
    canManage : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationTitle.defaultProps = {
    className : "",
    variant   : Brightness.DARK,
    href      : "",
    canAdd    : false,
    canManage : false,
};

export default NavigationTitle;
