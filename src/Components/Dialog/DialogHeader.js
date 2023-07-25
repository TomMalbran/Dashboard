import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const Header = Styled.header.attrs(({ lightHeader }) => ({ lightHeader }))`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    border-bottom: none;
    border-top-left-radius: var(--dialog-radius);
    border-top-right-radius: var(--dialog-radius);
    height: var(--dialog-header);

    ${(props) => props.lightHeader ? `
        color: var(--title-color);
        border-bottom: 1px solid var(--border-color-light);
    ` : `
        color: white;
        background-color: var(--primary-color);
    `}

    @media (max-width: 500px) {
        padding-right: 8px;
        padding-left: 8px;
    }
`;

const Div = Styled.div`
    flex-grow: 2;
    display: flex;
    align-items: center;

    & > .icon {
        font-size: 24px;
        margin-right: 8px;
    }
    & > .tabs {
        margin-left: 32px;
        margin-bottom: 0;
    }
`;

const H2 = Styled.h2`
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 400;
    font-family: var(--title-font);
    letter-spacing: 1px;
`;



/**
 * The Dialog Header Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogHeader(props) {
    const {
        className, message, icon,
        dontClose, onClose, lightHeader, children,
    } = props;


    // Do the Render
    return <Header className={className} lightHeader={lightHeader}>
        <Div>
            {!!icon && <Icon icon={icon} />}
            <H2>{NLS.get(message)}</H2>
            {children}
        </Div>
        <IconLink
            isHidden={dontClose}
            variant={lightHeader ? "black" : "darker"}
            icon="close"
            onClick={onClose}
            isSmall
        />
    </Header>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogHeader.propTypes = {
    className   : PropTypes.string,
    message     : PropTypes.string,
    icon        : PropTypes.string,
    lightHeader : PropTypes.bool,
    dontClose   : PropTypes.bool,
    onClose     : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogHeader.defaultProps = {
    className   : "",
    message     : "",
    lightHeader : false,
    dontClose   : false,
};

export default DialogHeader;
