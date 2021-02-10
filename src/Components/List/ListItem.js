import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Li = Styled.li.attrs(({ columns }) => ({ columns }))`
    display: grid;
    grid-template-columns: 2fr ${(props) => "1fr ".repeat(props.columns - 1)};
    grid-gap: 16px;
    color: var(--black-color);
    
    &:not(:last-child) {
        padding-bottom: 16px;
    }

    & .inputfield {
        white-space: nowrap;
    }
`;



/**
 * The List Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ListItem(props) {
    const { className, columns, children } = props;
    
    return <Li className={className} columns={columns}>
        {children}
    </Li>;
}
    
/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ListItem.propTypes = {
    className : PropTypes.string,
    columns   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ListItem.defaultProps = {
    className : "",
};

export default ListItem;
