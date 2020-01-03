import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import NavigationList       from "./NavigationList";



// Styles
const Nav = Styled.nav`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 12px 16px;
    overflow: auto;
`;

const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;



/**
 * Creates the Children
 * @param {Object} props
 * @returns {{children: React.ReactElement[], addList: Boolean}}
 */
function getChildren(props) {
    const { variant, path, baseUrl, onClose } = props;

    const childs   = Utils.toArray(props.children);
    const children = [];
    let   addList  = true;
    let   key      = 0;

    for (const child of childs) {
        if (child.type === NavigationList) {
            addList = false;
        }
        const clone = React.cloneElement(child, {
            key, path, baseUrl, onClose,
            variant : `${variant}-menu`,
        });
        children.push(clone);
        key += 1;
    }
    return { children, addList };
}



/**
 * The Navigation Body Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationBody(props) {
    const { className, variant } = props;
    const { children, addList  } = getChildren(props);

    const scrollbars = variant === "dark" ? "dark-scrollbars" : "";

    return <Nav className={`${scrollbars} ${className}`}>
        {addList  && <Ul>{children}</Ul>}
        {!addList && children}
    </Nav>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationBody.propTypes = {
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
NavigationBody.defaultProps = {
    className : "",
    baseUrl   : "",
};

export default NavigationBody;
