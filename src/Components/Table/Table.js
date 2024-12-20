import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Action               from "../../Core/Action";
import Navigate             from "../../Core/Navigate";
import Utils                from "../../Utils/Utils";

// Components
import TableHead            from "../Table/TableHead";
import TableBody            from "../Table/TableBody";
import TableFoot            from "../Table/TableFoot";
import TablePaging          from "../Table/TablePaging";
import TableActionList      from "../Table/TableActionList";
import Menu                 from "../Menu/Menu";
import MenuItem             from "../Menu/MenuItem";
import NoneAvailable        from "../Common/NoneAvailable";
import CircularLoader       from "../Loader/CircularLoader";



// Styles
const Wrapper = Styled.div`
    position: relative;
`;

const Container = Styled.table.attrs(({ inDialog, hasFilter, statsAmount, hasTabs, hasAlert, hasPaging, hasScroll }) => ({ inDialog, hasFilter, statsAmount, hasTabs, hasAlert, hasPaging, hasScroll }))`
    ${(props) => props.inDialog ? `
        --table-height: calc(var(--dialog-body) - 2 * var(--main-padding) - 2px);
    ` : `
        --table-height: calc(var(--main-height) - var(--main-padding) - var(--header-height) - 2px);
    `}

    --table-header-height: 27px;
    --table-header-right: ${(props) => props.hasScroll ? "16px" : "0px"};
    --table-filter-height: ${(props) => props.hasFilter ? "var(--filter-height)" : "0px"};
    --table-stats-height: ${(props) => props.statsAmount > 0 ? `calc((var(--stats-height) + var(--main-gap)) * ${props.statsAmount})` : "0px"};
    --table-tabs-height: ${(props) => props.hasTabs ? "var(--tabs-table)" : "0px"};
    --table-alert-height: ${(props) => props.hasAlert ? "var(--alert-height)" : "0px"};
    --table-paging-height: ${(props) => props.hasPaging ? "32px" : "0px"};

    display: flex;
    flex-direction: column;
    width: 100%;
    table-layout: fixed;
    color: var(--table-font-color);

    .input-content {
        background-color: transparent;
    }

    ${(props) => props.hasScroll && `tr:last-child td {
        border-bottom: none;
    }`}

    @media (max-width: 700px) {
        --table-header-height: 0px;
    }
`;



/**
 * The Table Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Table(props) {
    const {
        sort, fetch, className, isLoading, none, hideEmpty,
        noClick, inDialog, hasFilter, statsAmount, hasTabs, hasAlert,
        noSorting, hasIDs, notFixed,
        checked, setChecked, hasCheckAll, children,
    } = props;

    // References
    const tableRef = React.useRef(null);
    const navigate = Navigate.useGoto();
    const path     = Navigate.usePath();

    // The Current State
    const [ menuID,     setMenuID     ] = React.useState(null);
    const [ menuTop,    setMenuTop    ] = React.useState(null);
    const [ menuLeft,   setMenuLeft   ] = React.useState(null);
    const [ menuDir,    setMenuDir    ] = React.useState(null);
    const [ iconHeight, setIconHeight ] = React.useState(0);
    const [ hasScroll,  setHasScroll  ] = React.useState(false);


    // Handles the Click
    const handleClick = (elem, elemID) => {
        if (elem.onClick) {
            elem.onClick(elemID);
        } else if (elem.onAction) {
            elem.onAction(elem.act, elemID);
        } else if (elem.navigate) {
            navigate(path, elemID);
        }
    };

    // Handles the Row Click
    const handleRowClick = (elemID) => {
        if (noClick || menuID !== null || Utils.hasSelection()) {
            return;
        }
        for (const action of actions) {
            if (action.action && (!action.hide || !action.hide(elemID))) {
                handleClick(action, elemID);
                break;
            }
        }
    };

    // Handles the Menu Open
    const handleMenuOpen = (menuID, menuTop, menuLeft, menuDir, iconHeight) => {
        setMenuID(menuID);
        setMenuTop(menuTop);
        setMenuLeft(menuLeft);
        setMenuDir(menuDir);
        setIconHeight(iconHeight);
    };

    // Handles the Menu Close
    const handleMenuClose = () => {
        setMenuID(null);
    };

    // Close the Menu if the Filter Changes
    React.useEffect(() => {
        if (sort && sort.filter && menuID) {
            handleMenuClose();
        }
    }, [ sort ]);



    // Get the Actions and ColSpan
    const actions    = [];
    const items      = [];
    const columns    = [];
    const elemIDs    = [];

    let   colSpan    = 0;
    let   hasContent = false;
    let   hasPaging  = false;
    let   hasFooter  = false;
    let   hasActions = false;

    for (const child of Utils.toArray(children)) {
        if (child.type === TableHead) {
            const tableHeads = Utils.toArray(child.props.children);
            colSpan = tableHeads.length;
            for (const tableHead of tableHeads) {
                columns.push({
                    isHidden    : !!tableHead.props.isHidden,
                    isTitle     : !!tableHead.props.isTitle,
                    isSmall     : !!tableHead.props.isSmall,
                    isFlex      : !!tableHead.props.isFlex,
                    isMultiline : !!tableHead.props.isMultiline,
                    bigMobile   : !!tableHead.props.bigMobile,
                    hideMobile  : !!tableHead.props.hideMobile,
                    hideCircle  : !!tableHead.props.hideCircle,
                    noSpace     : !!tableHead.props.noSpace,
                    smallSpace  : !!tableHead.props.smallSpace,
                    grow        : tableHead.props.grow     || "",
                    shrink      : tableHead.props.shrink   || "",
                    minWidth    : tableHead.props.minWidth || "",
                    maxWidth    : tableHead.props.maxWidth || "",
                    align       : tableHead.props.align    || "",
                    rightSpace  : false,
                });
            }
        }

        if (child.type === TableBody) {
            hasContent = child.props.children && child.props.children.length > 0;
            const tableRows = Utils.toArray(child.props.children);
            for (const tableRow of tableRows) {
                elemIDs.push(tableRow.props.elemID);
            }
        }

        if (child.type === TablePaging) {
            hasPaging = true;
        }
        if (child.type === TableFoot) {
            hasFooter = true;
        }

        if (child.type === TableActionList) {
            for (const tableAction of Utils.toArray(child.props.children)) {
                const action = { ...tableAction.props };
                action.act = Action.get(action.action);
                if (!action.isHidden && ((action.act.isCCED && child.props.canEdit) || !action.act.isCCED)) {
                    hasActions = true;
                    if (!action.navigate && !action.onClick) {
                        action.onClick  = child.props.onClick;
                        action.onAction = child.props.onAction;
                    }
                    if (!menuID || !action.hide || !action.hide(menuID)) {
                        actions.push(action);
                    }
                }
            }
            break;
        }
    }


    const showMenu     = hasActions && Boolean(menuID !== null && menuTop);
    const hasSorting   = !noSorting && !Utils.isEmpty(sort);
    const hasChecks    = Boolean(checked && setChecked);
    const isCheckedAll = hasChecks && elemIDs.length === checked.length;

    if (hasActions) {
        colSpan += 1;
    } else {
        columns[columns.length - 1].rightSpace = true;
    }

    // Checks all the columns
    const setCheckedAll = () => {
        if (isCheckedAll) {
            setChecked([]);
        } else {
            setChecked(elemIDs);
        }
    };

    // Get the Children
    for (const [ key, child ] of Utils.getChildren(children)) {
        if (child.type !== TableActionList) {
            items.push(React.cloneElement(child, {
                key, fetch, sort, colSpan, columns,
                hasIDs, hasChecks, hasActions, hasSorting,
                hasPaging, hasFooter, notFixed,
                checked, setChecked, hasCheckAll, setCheckedAll, isCheckedAll,
                handleRowClick, handleMenuOpen,
            }));
        }
    }

    // Check if the Table should scroll
    React.useEffect(() => {
        if (tableRef.current && items.length) {
            const body = tableRef.current.querySelector("tbody");
            setHasScroll(body.scrollHeight > body.clientHeight);
        }
    }, [ isLoading, elemIDs.length ]);


    // Do the Render
    if (isLoading) {
        return <CircularLoader top={40} />;
    }
    if (!hasContent && none) {
        return <div>
            <NoneAvailable message={none} />
        </div>;
    }
    if (!hasContent && hideEmpty) {
        return <React.Fragment />;
    }
    return <>
        <Wrapper ref={tableRef}>
            <Container
                className={className}
                inDialog={inDialog}
                hasFilter={hasFilter}
                statsAmount={statsAmount}
                hasTabs={hasTabs}
                hasAlert={hasAlert}
                hasPaging={hasPaging}
                hasScroll={hasScroll}
            >
                {items}
            </Container>
        </Wrapper>

        <Menu
            containerRef={tableRef}
            open={showMenu}
            top={menuTop}
            left={menuLeft}
            direction={menuDir}
            iconHeight={iconHeight}
            onClose={handleMenuClose}
        >
            {actions.map((elem, index) => <MenuItem
                key={index}
                icon={elem.icon || elem.act.icon}
                message={elem.message || elem.act.message}
                onClick={() => handleClick(elem, menuID)}
            />)}
        </Menu>
    </>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Table.propTypes = {
    className   : PropTypes.string,
    fetch       : PropTypes.func,
    sort        : PropTypes.object,
    none        : PropTypes.string,
    hideEmpty   : PropTypes.bool,
    isLoading   : PropTypes.bool,
    inDialog    : PropTypes.bool,
    hasFilter   : PropTypes.bool,
    statsAmount : PropTypes.number,
    hasTabs     : PropTypes.bool,
    hasAlert    : PropTypes.bool,
    hasIDs      : PropTypes.bool,
    noSorting   : PropTypes.bool,
    noClick     : PropTypes.bool,
    notFixed    : PropTypes.bool,
    checked     : PropTypes.array,
    setChecked  : PropTypes.func,
    hasCheckAll : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Table.defaultProps = {
    className   : "",
    sort        : {},
    none        : "",
    hideEmpty   : false,
    isLoading   : false,
    hasFilter   : false,
    statsAmount : 0,
    hasTabs     : false,
    hasIDs      : false,
    noSorting   : false,
    notFixed    : false,
    hasCheckAll : false,
};

export default Table;
