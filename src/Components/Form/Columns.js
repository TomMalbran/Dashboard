import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Div = Styled.div.attrs(({ amount, topSpace }) => ({ amount, topSpace }))`
    display: grid;
    grid-template-columns: repeat(${(props) => props.amount}, 1fr);
    gap: 16px;
    ${(props) => props.topSpace && `padding-top: ${props.topSpace}px;`}

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

    @media (max-width: 700px) {
        ${(props) => (Number(props.amount) === 3 || Number(props.amount) === 4) && `
            grid-template-columns: repeat(2, 1fr);
        `}

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
        grid-template-columns: 1fr;

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
    const {
        isHidden, className, amount, topSpace,
        onSubmit, autoFocus, children,
    } = props;

    const items = Utils.cloneChildren(children, (child, key) => ({
        onSubmit, autoFocus : autoFocus && key === 0,
    }));

    if (isHidden || !items.length) {
        return <React.Fragment />;
    }
    return <Div
        className={className}
        amount={amount}
        topSpace={topSpace}
    >
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
    topSpace  : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
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
