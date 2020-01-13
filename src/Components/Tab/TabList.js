import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import HyperLink            from "../Common/HyperLink";

// Variants
const Variant = {
    TABLE  : "table",
    DIALOG : "dialog",
};



// Styles
const Section = Styled.section.attrs(({ variant }) => ({ variant }))`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${(props) => props.variant === Variant.DIALOG && `
        flex-grow: 2;
        margin-top: calc(var(--dialog-header) - var(--tabs-dialog));
        margin-left: 32px;
        background-color: var(--primary-color);

        & > .icon {
            color: white;
            margin-right: 16px;
        }
    `}
`;

const Div = Styled.div.attrs(({ variant }) => ({ variant }))`
    ${(props) => props.variant === Variant.TABLE  && "display: flex;"}
    ${(props) => props.variant === Variant.DIALOG && `
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

    const linkVariant = variant === "dialog" ? "icon-dark" : "icon-light";
    const items       = [];

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
        {showAdd && <HyperLink
            variant={linkVariant}
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
    variant   : PropTypes.string.isRequired,
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
    showAdd   : false,
};

export default TabList;
