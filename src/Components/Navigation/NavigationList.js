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
 * The Navigation List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationList(props) {
    const { className, variant, path, baseUrl, onAction, onClose, children } = props;

    const items = [];
    for (const [ key, child ] of Utils.toEntries(children)) {
        if (child && !child.props.isHidden) {
            items.push(React.cloneElement(child, {
                key, variant, path, baseUrl, onAction, onClose,
            }));
        }
    }

    return <Ul className={className}>
        {items}
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
    onAction  : PropTypes.func,
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
