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
    const { className, data, onClick, useAdd, useAssign, children } = props;

    const items = [];
    for (const [ key, child ] of Utils.toEntries(children)) {
        if (child && !child.props.isHidden) {
            items.push(React.cloneElement(child, {
                key, onClick,
            }));
        }
    }

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
            onClick={onClick}
        />}
        {data.canImport && <ActionItem
            action="IMPORT"
            onClick={onClick}
        />}
        {canExport && <ActionItem
            action="EXPORT"
            onClick={onClick}
        />}
        {canFilter && <ActionItem
            action="FILTER"
            onClick={onClick}
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
    onClick   : PropTypes.func,
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
