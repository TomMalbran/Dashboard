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
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--dialog-padding);
    border-bottom: none;
    border-top-left-radius: var(--dialog-radius);
    border-top-right-radius: var(--dialog-radius);
    height: var(--dialog-header);
    color: var(--title-color);

    @media (max-width: 500px) {
        padding-right: 8px;
        padding-left: 8px;
    }
`;

const Start = Styled.div`
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

const End = Styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
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
        dontClose, onClose, childrenOnEnd, children,
    } = props;


    // Do the Render
    return <Header className={className}>
        <Start>
            {!!icon && <Icon icon={icon} />}
            <H2>{NLS.get(message)}</H2>
            {!childrenOnEnd && children}
        </Start>
        <End>
            {childrenOnEnd && children}
            <IconLink
                isHidden={dontClose}
                variant="black"
                icon="close"
                onClick={onClose}
                isSmall
            />
        </End>
    </Header>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogHeader.propTypes = {
    className     : PropTypes.string,
    message       : PropTypes.string,
    icon          : PropTypes.string,
    dontClose     : PropTypes.bool,
    onClose       : PropTypes.func,
    childrenOnEnd : PropTypes.bool,
    children      : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogHeader.defaultProps = {
    className     : "",
    message       : "",
    dontClose     : false,
    childrenOnEnd : false,
};

export default DialogHeader;
