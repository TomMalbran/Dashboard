import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import CircularLoader       from "../Common/CircularLoader";
import NoneAvailable        from "../Common/NoneAvailable";
import NavigationList       from "../Navigation/NavigationList";

// Variants
const Variant = {
    DARK  : "dark",
    LIGHT : "light",
};



// Styles
const Nav = Styled.nav.attrs(({ withSpacing }) => ({ withSpacing }))`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${(props) => props.withSpacing && "0 12px 16px"};
    overflow: auto;
`;

const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;



/**
 * The Navigation Body Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationBody(props) {
    const { className, variant, path, baseUrl, onAction, onClose, none, isLoading, withSpacing, children } = props;

    const items   = [];
    let   addList = true;
    for (const [ key, child ] of Utils.getChildren(children)) {
        if (child.type === NavigationList) {
            addList = false;
        }
        if (!child.props.isHidden) {
            items.push(React.cloneElement(child, {
                key, variant, path, baseUrl, onAction, onClose,
            }));
        }
    }

    const showLoader = isLoading;
    const showNone   = Boolean(!isLoading && !items.length && none);
    const showItems  = Boolean(!isLoading && items.length);
    const scrollbars = variant === Variant.DARK ? "dark-scrollbars" : "";

    return <Nav className={`${scrollbars} ${className}`} withSpacing={withSpacing}>
        {showLoader && <CircularLoader variant="white" />}
        {showNone   && <NoneAvailable  variant="white" message={none} />}
        {showItems  && (addList ? <Ul>{items}</Ul> : items)}
    </Nav>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationBody.propTypes = {
    className   : PropTypes.string,
    variant     : PropTypes.string,
    path        : PropTypes.string,
    baseUrl     : PropTypes.string,
    none        : PropTypes.string,
    isLoading   : PropTypes.bool,
    withSpacing : PropTypes.bool,
    onAction    : PropTypes.func,
    onClose     : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
NavigationBody.defaultProps = {
    className   : "",
    baseUrl     : "",
    none        : "",
    isLoading   : false,
    withSpacing : true,
};

export default NavigationBody;
