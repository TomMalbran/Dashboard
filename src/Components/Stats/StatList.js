import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul.attrs(({ columns }) => ({ columns }))`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: 8px;
    box-sizing: border-box;
    height: var(--stats-height);
    margin: 0 0 8px 0;
    padding: 0;
    list-style: none;
    color: var(--darker-color);
    overflow-y: hidden;
    overflow-x: auto;
`;



/**
 * The Stat List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function StatList(props) {
    const { isHidden, className, twoLines, children } = props;

    if (isHidden) {
        return <React.Fragment />;
    }

    const items = Utils.cloneChildren(children, () => ({ twoLines }));
    return <Ul className={className} columns={items.length}>
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
StatList.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    twoLines  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
StatList.defaultProps = {
    isHidden  : false,
    className : "",
    twoLines  : false,
};

export default StatList;
