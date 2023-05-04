import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul.attrs(({ columns }) => ({ columns }))`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: var(--main-gap);
    box-sizing: border-box;
    height: var(--stats-height);
    margin: 0 0 var(--main-gap) 0;
    padding: 0;
    list-style: none;
    overflow-y: hidden;
    overflow-x: auto;
`;



/**
 * The Stat List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function StatList(props) {
    const { isHidden, className, outlined, twoLines, usePrimary, children } = props;

    if (isHidden) {
        return <React.Fragment />;
    }

    const items = Utils.cloneChildren(children, () => ({
        outlined, twoLines, usePrimary,
    }));

    return <Ul className={className} columns={items.length}>
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatList.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    outlined   : PropTypes.bool,
    twoLines   : PropTypes.bool,
    usePrimary : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
StatList.defaultProps = {
    isHidden   : false,
    className  : "",
    outlined   : false,
    twoLines   : false,
    usePrimary : false,
};

export default StatList;
