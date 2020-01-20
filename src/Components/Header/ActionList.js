import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Utils                from "../../Utils/Utils";

// Components
import ActionItem           from "./ActionItem";



// Styles
const Ul = Styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
`;



/**
 * The Action List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ActionList(props) {
    const { className, data, onAction, useAdd, useAssign, children } = props;

    const items      = Utils.cloneChildren(children, () => ({ onAction }));
    const createText = useAdd ? "GENERAL_ADD" : (useAssign ? "GENERAL_ASSIGN" : "GENERAL_CREATE");
    const canExport  = data.canExport && data.total > 0;
    const canFilter  = data.canFilter && data.total > 0;
    const hasActions = data.canCreate || data.canImport || canExport || canFilter || items.length > 0;
    
    if (!hasActions) {
        return <React.Fragment />;
    }

    return <Ul className={className}>
        {data.canCreate && <ActionItem
            action="CREATE"
            message={createText}
            onAction={onAction}
        />}
        {data.canImport && <ActionItem
            action="IMPORT"
            onAction={onAction}
        />}
        {canExport && <ActionItem
            action="EXPORT"
            onAction={onAction}
        />}
        {canFilter && <ActionItem
            action="FILTER"
            onAction={onAction}
        />}
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ActionList.propTypes = {
    data      : PropTypes.object.isRequired,
    className : PropTypes.string,
    onAction  : PropTypes.func,
    useAdd    : PropTypes.bool,
    useAssign : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ActionList.defaultProps = {
    className : "",
};

export default ActionList;
