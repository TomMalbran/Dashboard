import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    & + & {
        margin-top: 32px;
    }
`;



/**
 * Creates the Children
 * @param {Object} props
 * @returns {React.ReactElement[]}
 */
function getChildren(props) {
    const { variant, path, baseUrl, onClose } = props;

    const childs   = Utils.toArray(props.children);
    const children = [];
    let   key      = 0;

    for (const child of childs) {
        if (!child.props.isHidden) {
            const clone = React.cloneElement(child, {
                key, variant, path, baseUrl, onClose,
            });
            children.push(clone);
            key += 1;
        }
    }
    return children;
}



/**
 * The Navigation List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationList(props) {
    const { className } = props;

    return <Ul className={className}>
        {getChildren(props)}
    </Ul>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationList.propTypes = {
    className : PropTypes.string,
    variant   : PropTypes.string,
    path      : PropTypes.string,
    baseUrl   : PropTypes.string,
    onClose   : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
NavigationList.defaultProps = {
    className : "",
    baseUrl   : "",
};

export default NavigationList;
