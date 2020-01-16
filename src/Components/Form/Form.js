import React                from "react";
import PropTypes            from "prop-types";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import Alert                from "../Form/Alert";
import Columns              from "../Form/Columns";



/**
 * The Form Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Form(props) {
    const { className, error, onSubmit, children } = props;

    const items   = [];
    let   isFirst = false;
    for (const [ key, child ] of Utils.toEntries(children)) {
        items.push(React.cloneElement(child, {
            key, onSubmit,
            autoFocus : (child.type === Columns || !child.props.isHidden) && isFirst,
        }));
        isFirst = false;
    }


    return <div className={className}>
        <Alert variant="error" message={error} />
        {items}
    </div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Form.propTypes = {
    className : PropTypes.string,
    error     : PropTypes.string,
    onSubmit  : PropTypes.func,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Form.defaultProps = {
    className : "",
};

export default Form;
