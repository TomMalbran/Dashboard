import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const Div = Styled.div`
    display: flex;
    align-items: center;
`;



/**
 * The List Content Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ListContent(props) {
    const { children } = props;

    return <Div>
        {children}
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ListContent.propTypes = {
    children : PropTypes.any,
};

export default ListContent;
