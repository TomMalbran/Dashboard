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

    .inputfield:last-child,
    .inputview:last-child {
        margin-bottom: 20px;
    }

    ${(props) => Number(props.amount) === 1 && `
        &:last-child .inputfield,
        &:last-child .inputview {
            margin-bottom: 0;
        }
    `}

    ${(props) => Number(props.amount) === 2 && `
        &:last-child .inputfield:not(.columns-double):nth-last-child(-n+2),
        &:last-child .inputview:not(.columns-double):nth-last-child(-n+2) {
            margin-bottom: 0;
        }
        &:last-child .inputfield.columns-double:last-child,
        &:last-child .inputview.columns-double:last-child {
            margin-bottom: 0;
        }
    `}

    ${(props) => Number(props.amount) === 3 && `
        &:last-child .inputfield:nth-last-child(-n+3),
        &:last-child .inputview:nth-last-child(-n+3) {
            margin-bottom: 0;
        }
        @media (max-width: 700px) {
            grid-template-columns: repeat(2, 1fr);
        }
    `}

    @media (max-width: 700px) {
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
        display: block;

        &:last-child .inputfield.inputfield:nth-last-child(-n+2),
        &:last-child .inputview.inputview:nth-last-child(-n+2) {
            margin-bottom: 20px;
        }
        &:last-child .inputfield.inputfield:nth-last-child(-n+2),
        &:last-child .inputview.inputview:nth-last-child(-n+2) {
            margin-bottom: 20px;
        }
        &:last-child .inputfield.inputfield:last-child,
        &:last-child .inputview.inputview:last-child {
            margin-bottom: 0;
        }
    }
`;



/**
 * The Columns Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Columns(props) {
    const { isHidden, className, amount, onSubmit, autoFocus, children } = props;

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
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    amount    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onSubmit  : PropTypes.func,
    autoFocus : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Columns.defaultProps = {
    isHidden  : false,
    className : "",
    amount    : 2,
    autoFocus : false,
};

export default Columns;
