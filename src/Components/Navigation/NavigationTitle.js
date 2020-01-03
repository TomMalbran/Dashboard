import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import HyperLink            from "../Common/HyperLink";



// Styles
const Header = Styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    min-height: var(--header-height);
    padding: 18px 12px 10px 8px;

    .navigation-add {
        color: white;
    }
`;

const Div = Styled.div`
    margin-left: 8px;
    font-weight: 400;
`;
const Span1 = Styled.span`
    display: block;
    font-size: 14px;
    font-weight: 400;
    font-family: var(--main-font);
`;
const Span2 = Styled.span`
    display: block;
    font-size: 20px;
`;



/**
 * The Navigation Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationTitle(props) {
    const { className, variant, href, message, fallback, canAdd, onAdd } = props;
    
    return <Header className={className}>
        <h2 className={`title title-${variant}`}>
            <HyperLink
                variant="icon"
                icon="back"
                href={href}
            />
            {message ? <Div className="title-content">
                <Span1>{NLS.get(fallback)}</Span1>
                <Span2>{NLS.get(message)}</Span2>
            </Div> : NLS.get(fallback)}
        </h2>
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
    variant   : "light",
    canAdd    : false,
};

export default NavigationTitle;
