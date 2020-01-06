import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";



// Styles
const Div = Styled.div`
    color: rgb(94, 108, 132);
    background-color: white;
    border-radius: var(--border-radius);
    
    & + & {
        margin-top: 16px;
    }
`;

const H3 = Styled.h3`
    margin: 0;
    padding: 12px 8px 8px 8px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    color: var(--black-color);
    border-bottom: 1px solid var(--lighter-gray);
    font-family: var(--title-font);
`;

const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;



/**
 * The Detail List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DetailList(props) {
    const { isHidden, message, children } = props;
    
    if (isHidden) {
        return <React.Fragment />;
    }

    return <Div>
        <H3>{NLS.get(message)}</H3>
        <Ul>{children}</Ul>
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
DetailList.propTypes = {
    isHidden : PropTypes.bool,
    message  : PropTypes.string.isRequired,
    children : PropTypes.any,
};

export default DetailList;
