import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
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
    border-top-left-radius: var(--dialog-radius);
    border-top-right-radius: var(--dialog-radius);
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
    font-size: 18px;
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
    const { className, message, icon, dontClose, onClose, children } = props;

    return <Header className={className}>
        <Div>
            {!!icon && <Icon icon={icon} />}
            <H2>{NLS.get(message)}</H2>
            {children}
        </Div>
        <IconLink
            isHidden={dontClose}
            variant="darker"
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
    className : PropTypes.string,
    message   : PropTypes.string,
    icon      : PropTypes.string,
    dontClose : PropTypes.bool,
    onClose   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogHeader.defaultProps = {
    className : "",
    message   : "",
    dontClose : false,
};

export default DialogHeader;
