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
    padding-right: 16px;

    ${(props) => props.variant === Variant.DARK && `
        flex-grow: 2;
        background-color: var(--primary-color);
    `}
`;

const Div = Styled.div.attrs(({ variant }) => ({ variant }))`
    ${(props) => props.variant === Variant.LIGHT && "display: flex;"}
    ${(props) => props.variant === Variant.DARK  && `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        flex-grow: 2;
    `}
`;



/**
 * The Tab List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TabList(props) {
    const { className, variant, value, onAction, showAdd, children } = props;

    const items = [];
    for (const [ key, child ] of Utils.toEntries(children)) {
        if (!child.props.isHidden) {
            items.push(React.cloneElement(child, {
                key, variant, onAction,
                index      : key,
                isSelected : child.props.value ? String(child.props.value) === String(value) : key === value,
            }));
        }
    }

    return <Section className={`tabs ${className}`} variant={variant}>
        <Div variant={variant}>
            {items}
        </Div>
        {showAdd && <IconLink
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
    value     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
    onAction  : PropTypes.func.isRequired,
    showAdd   : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabList.defaultProps = {
    className : "",
    variant   : Variant.LIGHT,
    showAdd   : false,
};

export default TabList;
