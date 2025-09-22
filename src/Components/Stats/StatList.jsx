import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul.attrs(({ columns }) => ({ columns }))`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, minmax(min-content, 1fr));
    gap: var(--main-gap);
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
 * @param {object} props
 * @returns {React.ReactElement}
 */
function StatList(props) {
    const { isHidden, className, variant, twoLines, children } = props;


    if (isHidden) {
        return <React.Fragment />;
    }


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        variant, twoLines,
    }));


    // Do the Render
    return <Ul
        className={`${className} no-scrollbars`}
        columns={items.length}
    >
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
StatList.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    variant   : PropTypes.string,
    twoLines  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
StatList.defaultProps = {
    isHidden  : false,
    className : "",
};

export default StatList;
