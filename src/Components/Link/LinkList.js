import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;



/**
 * The Link List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function LinkList(props) {
    const { className, path, children } = props;

    const items = [];
    for (const [ key, child ] of Utils.getChildren(children)) {
        const isSelected = child.props.isSelected || (child.props.url ? path === NLS.url(child.props.url) : false);
        const clone      = React.cloneElement(child, { isSelected });
        items.push(<li key={key}>{clone}</li>);
    }

    return <Ul className={className}>
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
LinkList.propTypes = {
    className : PropTypes.string,
    path      : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
LinkList.defaultProps = {
    className : "",
};

export default LinkList;
