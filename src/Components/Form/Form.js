import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import Alert                from "../Form/Alert";
import Columns              from "../Form/Columns";



// Styles
const Content = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;



/**
 * The Form Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Form(props) {
    const { className, error, noAutoFocus, onSubmit, children } = props;

    const items   = [];
    let   isFirst = true;
    for (const [ key, child ] of Utils.getChildren(children)) {
        let autoFocus = child && (child.type === Columns || !child.props.isHidden) && isFirst;
        if (noAutoFocus) {
            autoFocus = false;
        }
        items.push(React.cloneElement(child, { key, onSubmit, autoFocus }));
        if (child && (child.type === Columns || !child.props.isHidden) && isFirst) {
            isFirst = false;
        }
    }


    return <Content className={className}>
        <Alert variant="error" message={error} noClose />
        {items}
    </Content>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Form.propTypes = {
    className   : PropTypes.string,
    error       : PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    noAutoFocus : PropTypes.bool,
    onSubmit    : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Form.defaultProps = {
    className   : "",
    noAutoFocus : false,
};

export default Form;
