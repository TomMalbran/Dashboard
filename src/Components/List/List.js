import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Utils                from "../../Utils/Utils";



// Styles
const Ul = Styled.ul.attrs(({ withSpacing }) => ({ withSpacing }))`
    margin: 0;
    padding: 0;
    list-style: none;

    ${(props) => props.withSpacing && `
        padding: 24px;
    `}
`;



/**
 * The List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function List(props) {
    const { className, withSpacing, columns, children } = props;


    // Clone the Children
    const items = Utils.cloneChildren(children, () => ({
        columns : Number(columns),
    }));


    // Do the Render
    return <Ul className={className} withSpacing={withSpacing}>
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
List.propTypes = {
    className   : PropTypes.string,
    withSpacing : PropTypes.bool,
    columns     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
List.defaultProps = {
    className   : "",
    withSpacing : false,
    columns     : 2,
};

export default List;
