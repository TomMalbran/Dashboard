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
`;



/**
 * The Navigation Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationTitle(props) {
    const { variant, href, message, fallback, canAdd, onAdd } = props;
    
    return <Header>
        <h2 className={`title title-${variant}`}>
            <HyperLink
                className="navigation-back"
                variant="icon"
                icon="back"
                href={href}
            />
            {message ? <div className="title-content">
                <span>{NLS.get(fallback)}</span>
                <span>{NLS.get(message)}</span>
            </div> : NLS.get(fallback)}
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
    variant  : PropTypes.string,
    href     : PropTypes.string.isRequired,
    message  : PropTypes.string,
    fallback : PropTypes.string,
    canAdd   : PropTypes.bool,
    onAdd    : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
NavigationTitle.defaultProps = {
    variant : "light",
    canAdd  : false,
};

export default NavigationTitle;
