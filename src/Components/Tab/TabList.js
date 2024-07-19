import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import IconLink             from "../Link/IconLink";



// Styles
const Container = Styled.section.attrs(({ variant, inDialog, inDetails }) => ({ variant, inDialog, inDetails }))`
    display: flex;
    align-items: center;

    ${(props) => props.variant === Brightness.DARK && `
        background-color: var(--primary-color);
    `}
    ${(props) => props.variant === Brightness.DARKER && `
        background-color: var(--secondary-color);
    `}

    ${(props) => (!props.inDialog && !props.inDetails) && `
        margin-bottom: var(--main-gap);
    `}

    ${(props) => props.inDialog && `
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 2;
    `};

    ${(props) => props.inDetails && `
        position: sticky;
        top: 0;
        padding-top: var(--details-spacing);
        background-color: var(--lighter-gray);
        z-index: 2;
    `}
`;

const Div = Styled.div.attrs(({ size }) => ({ size }))`
    max-width: 100%;
    overflow: auto;
    display: flex;
    gap: var(--main-gap);

    ${(props) => props.size > 0 ? `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${props.size || 100}px, 1fr));
    ` : "display: flex;"}
`;

const TabLink = Styled(IconLink)`
    margin-left: 8px;
    .icon {
        font-size: 20px;
    }
`;



/**
 * The Tab List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TabList(props) {
    const {
        isHidden, className, variant, size, selected,
        onClick, onAction, inDialog, inDetails, canAdd, children,
    } = props;

    if (isHidden) {
        return <React.Fragment />;
    }
    const items = Utils.cloneChildren(children, (child, index) => ({
        index, variant, onClick, onAction, selected, inDialog,
    }));
    const showAdd = Boolean(canAdd && onAction);


    // Do the Render
    return <Container
        className={`tabs ${className}`}
        variant={variant}
        inDialog={inDialog}
        inDetails={inDetails}
    >
        <Div className="tabs-content no-scrollbars" size={size}>
            {items}
        </Div>
        {showAdd && <TabLink
            variant={variant === Brightness.DARK ? "darker" : "light"}
            icon="add"
            onClick={() => onAction(Action.get("ADD"))}
        />}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TabList.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    variant   : PropTypes.string,
    selected  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    onClick   : PropTypes.func,
    onAction  : PropTypes.func,
    inDialog  : PropTypes.bool,
    inDetails : PropTypes.bool,
    canAdd    : PropTypes.bool,
    size      : PropTypes.number,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabList.defaultProps = {
    isHidden  : false,
    className : "",
    variant   : Brightness.LIGHT,
    size      : 0,
    inDialog  : false,
    inDetails : false,
    canAdd    : false,
};

export default TabList;
