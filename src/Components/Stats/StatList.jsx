import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Container = Styled.ul.attrs(({ columns }) => ({ columns }))`
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
    const { isHidden, className, twoLines, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        twoLines,
    }));


    // Do the Render
    if (isHidden || !items.length) {
        return <React.Fragment />;
    }
    return <Container
        className={`stat-list ${className}`}
        columns={items.length}
    >
        {items}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
StatList.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
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
