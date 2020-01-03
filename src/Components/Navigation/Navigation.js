import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Section = Styled.section`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    width: var(--navigation-width);
`;

const DarkSection = Styled(Section)`
    background-color: var(--secondary-color);
    color: white;
`;

const LightSection = Styled(Section)`
    background-color: var(--lighter-gray);
    color: var(--font-light);
`;



/**
 * Creates the Children
 * @param {Object} props
 * @returns {React.ReactElement[]}
 */
function getChildren(props) {
    const { variant } = props;

    const childs   = Utils.toArray(this.props.children);
    const children = [];
    let   key      = 0;

    for (const child of childs) {
        if (!child.props.isHidden) {
            const clone = React.cloneElement(child, {
                key, variant,
            });
            children.push(clone);
            key += 1;
        }
    }
    return children;
}



/**
 * The Navigation Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Navigation(props) {
    const { className, variant } = props;
    const Component = variant === "dark" ? DarkSection : LightSection;

    return <Component className={className}>
        {getChildren(props)}
    </Component>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Navigation.propTypes = {
    variant   : PropTypes.string.isRequired,
    className : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Navigation.defaultProps = {
    className : "",
};

export default Navigation;
