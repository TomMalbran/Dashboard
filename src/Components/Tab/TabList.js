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
const Section = Styled.section.attrs(({ variant }) => ({ variant }))`
    display: flex;
    align-items: center;

    ${(props) => props.variant === Brightness.DARK && `
        background-color: var(--primary-color);
    `}
`;

const Div = Styled.div.attrs(({ size }) => ({ size }))`
    max-width: 100%;
    overflow: auto;
    display: flex;

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
        onClick, onAction, inHeader, bigSpacing, canAdd, children,
    } = props;

    if (isHidden) {
        return <React.Fragment />;
    }
    const items = Utils.cloneChildren(children, (child, index) => ({
        index, variant, onClick, onAction, selected, inHeader, bigSpacing,
    }));
    const showAdd = Boolean(canAdd && onAction);

    return <Section className={`tabs ${className}`} variant={variant}>
        <Div className="tabs-content" size={size}>
            {items}
        </Div>
        {showAdd && <TabLink
            variant={variant === Brightness.DARK ? "darker" : "light"}
            icon="add"
            onClick={() => onAction(Action.get("ADD"))}
        />}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TabList.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    variant    : PropTypes.string,
    selected   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
    onClick    : PropTypes.func,
    onAction   : PropTypes.func,
    inHeader   : PropTypes.bool,
    bigSpacing : PropTypes.bool,
    canAdd     : PropTypes.bool,
    size       : PropTypes.number,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabList.defaultProps = {
    isHidden   : false,
    className  : "",
    variant    : Brightness.LIGHT,
    size       : 0,
    inHeader   : false,
    bigSpacing : false,
    canAdd     : false,
};

export default TabList;
