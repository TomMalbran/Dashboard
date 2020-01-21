import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Div = Styled.div.attrs(({ amount }) => ({ amount }))`
    display: grid;
    grid-gap: 0 16px;
    grid-template-columns: repeat(${(props) => props.amount}, 1fr);
    
    .columns-double {
        grid-column-end: span 2;
    }
    .columns-triple {
        grid-column-end: span 3;
    }

    .columns-btn {
        grid-column-start: 3;
        display: flex;
        align-items: flex-end;
    }
    .columns-btn .btn + .btn {
        margin-left: 8px;
        margin-top: 0;
    }

    .inputview:last-child {
        margin-bottom: 20px;
    }

    ${(props) => props.amount === 2 && `
        &:last-child .inputview:nth-last-child(-n+2) {
            margin-bottom: 0;
        }
    `}
    ${(props) => props.amount === 3 && `
        &:last-child .inputview:nth-last-child(-n+3) {
            margin-bottom: 0;
        }

        @media (max-width: 1000px) {
            grid-template-columns: repeat(2, 1fr);
        }
    `}

    @media (max-width: 1000px) {
        .columns-double {
            grid-column-end: span 1;
        }
        .columns-triple {
            grid-column-end: span 2;
        }
        .columns-btn {
            grid-column-start: 2;
        }
    }
    
    @media (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
        
        .columns-triple {
            grid-column-end: span 1;
        }
        .columns-btn {
            grid-column-start: 1;
        }
    }
`;



/**
 * The Columns Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Columns(props) {
    const { className, amount, onSubmit, autoFocus, isHidden, children } = props;

    const items = Utils.cloneChildren(children, (child, key) => ({
        onSubmit, autoFocus : autoFocus && key === 0,
    }));

    if (isHidden || !items.length) {
        return <React.Fragment />;
    }
    return <Div className={className} amount={amount}>
        {items}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Columns.propTypes = {
    className : PropTypes.string,
    amount    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onSubmit  : PropTypes.func,
    autoFocus : PropTypes.bool,
    isHidden  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Columns.defaultProps = {
    className : "",
    amount    : 2,
    autoFocus : false,
    isHidden  : false,
};

export default Columns;
