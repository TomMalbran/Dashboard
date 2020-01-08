import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import HyperLink            from "../Common/HyperLink";

// Variants
const Variant = {
    DARK  : "dark",
    LIGHT : "light",
};



// Styles
const Header = Styled.header.attrs(({ variant }) => ({ variant }))`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    min-height: var(--header-height);
    padding: 18px 12px 10px 8px;

    ${(props) => props.variant === Variant.DARK && `
        .icon {
            color: var(--lightest-color);
        }
        .icon:hover {
            background-color:
        }
    `}
`;

const H2 = Styled.h2`
    display: flex;
    align-items: center;
    font-size: 26px;
    line-height: 1.2;
    color: var(--title-color);
    letter-spacing: 1px;
    margin: 0;
    font-family: var(--title-font);
    font-size: 22px;
`;

const Div = Styled.div`
    margin-left: 8px;
    font-weight: 400;
`;

const Span1 = Styled.span.attrs(({ variant }) => ({ variant }))`
    display: block;
    font-size: 14px;
    font-weight: 400;
    font-family: var(--main-font);

    ${(props) => props.variant === Variant.DARK && `
        color: var(--lightest-color);
    `}
    ${(props) => props.variant === Variant.LIGHT && `
        color: var(--subtitle-color);
    `}
`;

const Span2 = Styled.span.attrs(({ variant }) => ({ variant }))`
    display: block;
    font-size: 20px;

    ${(props) => props.variant === Variant.DARK && `
        color: white;
    `}
    ${(props) => props.variant === Variant.LIGHT && `
        color: var(--font-light);
    `}
`;



/**
 * The Navigation Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationTitle(props) {
    const { className, variant, href, message, fallback, canAdd, onAdd } = props;
    
    return <Header className={className} variant={variant}>
        <H2>
            <HyperLink
                className="navigation-back"
                variant="icon"
                icon="back"
                href={href}
            />
            {message ? <Div>
                <Span1 variant={variant}>{NLS.get(fallback)}</Span1>
                <Span2 variant={variant}>{NLS.get(message)}</Span2>
            </Div> : NLS.get(fallback)}
        </H2>
        {canAdd && <HyperLink
            className="navigation-add"
            variant="icon"
            icon="add"
            onClick={onAdd}
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
    href      : PropTypes.string.isRequired,
    message   : PropTypes.string,
    fallback  : PropTypes.string,
    canAdd    : PropTypes.bool,
    onAdd     : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationTitle.defaultProps = {
    className : "",
    variant   : Variant.DARK,
    canAdd    : false,
};

export default NavigationTitle;
