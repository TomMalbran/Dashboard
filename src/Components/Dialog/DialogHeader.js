import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import HyperLink            from "../Common/HyperLink";
import Icon                 from "../Common/Icon";



// Styles
const Header = Styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background-color: var(--primary-color);
    color: white;
    border-bottom: none;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    height: var(--dialog-header);

    @media (max-width: 500px) {
        padding-right: 8px;
        padding-left: 8px;
    }
`;

const Div = Styled.div`
    flex-grow: 2;
    display: flex;
    align-items: center;

    .icon {
        font-size: 24px;
        margin-right: 8px;
    }
    .tabs {
        margin-top: calc(var(--dialog-header) - var(--tabs-dialog));
        margin-left: 32px;
    }
`;

const H2 = Styled.h2`
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 400;
    font-family: var(--title-font);
    letter-spacing: 1px;
`;

const CloseLink = Styled(HyperLink)`
    .icon {
        font-size: 16px;
        color: white;
    }
    &:hover {
        background-color: var(--secondary-color);
    }
`;



/**
 * The Dialog Header Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogHeader(props) {
    const { className, message, icon, closeDialog, children } = props;

    return <Header className={className}>
        <Div>
            {!!icon && <Icon icon={icon} />}
            <H2>{NLS.get(message)}</H2>
            {children}
        </Div>
        <CloseLink
            variant="icon-dark"
            icon="close"
            onClick={closeDialog}
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
    closeDialog : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogHeader.defaultProps = {
    className : "",
    message   : "",
};

export default DialogHeader;
