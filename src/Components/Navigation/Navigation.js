import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Variants
const Variant = {
    DARK  : "dark",
    LIGHT : "light",
};



// Styles
const Section = Styled.section.attrs(({ variant }) => ({ variant }))`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    width: var(--navigation-width);

    ${(props) => props.variant === Variant.DARK && `
        background-color: var(--secondary-color);
        color: white;
    `}
    ${(props) => props.variant === Variant.LIGHT && `
        background-color: var(--lighter-gray);
        color: var(--font-light);
    `}
`;



/**
 * The Navigation Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Navigation(props) {
    const { className, variant, none, isLoading, onAction, children } = props;

    const items = [];
    for (const [ key, child ] of Utils.toEntries(children)) {
        if (!child.props.isHidden) {
            items.push(React.cloneElement(child, {
                key, variant, none, isLoading, onAction,
            }));
        }
    }

    return <Section className={`navigation ${className}`} variant={variant}>
        {items}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Navigation.propTypes = {
    variant   : PropTypes.string.isRequired,
    className : PropTypes.string,
    none      : PropTypes.string,
    isLoading : PropTypes.bool,
    onAction  : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Navigation.defaultProps = {
    className : "",
    none      : "",
    isLoading : false,
};

export default Navigation;
