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
    gap: var(--main-gap);

    @media (max-width: 500px) {
        .btn.btn {
            padding: 4px 8px;
        }
        .btn-preicon {
            margin-right: 0;
        }
        .btn-content {
            display: none;
        }
    }
`;



/**
 * The Action List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ActionList(props) {
    const {
        className, data, onAction, createText,
        useAdd, useAssign, withImport, withExport, children,
    } = props;

    const items      = Utils.cloneChildren(children, () => ({ onAction }));
    const createName = createText || (useAdd ? "GENERAL_ADD" : (useAssign ? "GENERAL_ASSIGN" : "GENERAL_CREATE"));
    const canCreate  = Boolean(data.canCreate);
    const canFilter  = Boolean(data.canFilter);
    const canImport  = Boolean(withImport && data.canImport);
    const canExport  = Boolean(withExport && data.canExport && data.total > 0);
    const hasActions = canCreate || canFilter || canImport || canExport || items.length > 0;

    if (!hasActions) {
        return <React.Fragment />;
    }
    return <Ul className={className}>
        {canCreate && <ActionItem
            action="CREATE"
            message={createName}
            onAction={onAction}
        />}
        {canFilter && <ActionItem
            action="FILTER"
            onAction={onAction}
        />}
        {canImport && <ActionItem
            action="IMPORT"
            onAction={onAction}
        />}
        {canExport && <ActionItem
            action="EXPORT"
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
    data       : PropTypes.object,
    className  : PropTypes.string,
    onAction   : PropTypes.func,
    createText : PropTypes.string,
    useAdd     : PropTypes.bool,
    useAssign  : PropTypes.bool,
    withImport : PropTypes.bool,
    withExport : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
ActionList.defaultProps = {
    className  : "",
    data       : {},
    createText : "",
    useAdd     : false,
    useAssign  : false,
    withImport : true,
    withExport : true,
};

export default ActionList;
