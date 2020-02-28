import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import IconLink             from "../Link/IconLink";

// Variants
const Variant = {
    LIGHT : "light",
    DARK  : "dark",
};



// Styles
const Section = Styled.section.attrs(({ variant }) => ({ variant }))`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${(props) => props.variant === Variant.DARK && `
        flex-grow: 2;
        background-color: var(--primary-color);
    `}
`;

const Div = Styled.div.attrs(({ variant, size }) => ({ variant, size }))`
    ${(props) => props.variant === Variant.LIGHT && "display: flex;"}
    ${(props) => props.variant === Variant.DARK  && `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${props.size || 100}px, 1fr));
        flex-grow: 2;
    `}
`;

const TabLink = Styled(IconLink)`
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
    const { className, variant, size, selected, onAction, canAdd, children } = props;

    const items = Utils.cloneChildren(children, (child, index) => ({
        index, variant, onAction, selected,
    }));

    return <Section className={`tabs ${className}`} variant={variant}>
        <Div variant={variant} size={size}>
            {items}
        </Div>
        {canAdd && <TabLink
            variant={variant === Variant.DARK ? "darker" : "light"}
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
    className : PropTypes.string,
    variant   : PropTypes.string,
    size      : PropTypes.number,
    selected  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
    onAction  : PropTypes.func.isRequired,
    canAdd    : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabList.defaultProps = {
    className : "",
    variant   : Variant.LIGHT,
    size      : 100,
    canAdd    : false,
};

export default TabList;
