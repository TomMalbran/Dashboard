import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Action               from "../../Core/Action";
import Href                 from "../../Core/Href";
import Utils                from "../../Utils/Utils";

// Components
import TableHead            from "../Table/TableHead";
import TableBody            from "../Table/TableBody";
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

const Container = Styled.table.attrs(({ inDialog, hasStats, hasTabs, hasFilter, hasPaging }) => ({ inDialog, hasStats, hasTabs, hasFilter, hasPaging }))`
    display: flex;
    flex-direction: column;
    width: 100%;
    table-layout: fixed;

    --table-height: ${(props) => props.inDialog ? "calc(100vh - 32px * 2 - 55px * 2 - 24px * 2 + 72px)" : "calc(100vh - 24px)"};
    --table-topbar-height: 0px;
    --table-header-height: 27px;
    --table-stats-height: ${(props) => props.hasStats ? "var(--stats-height)" : "0px"};
    --table-tabs-height: ${(props) => props.hasTabs ? "var(--tabs-table)" : "0px"};
    --table-filter-height: ${(props) => props.hasFilter ? "calc(var(--filter-height) + 16px)" : "0px"};
    --table-paging-height: ${(props) => props.hasPaging ? "34px" : "0px"};

    @media (max-width: 1000px) {
        --table-topbar-height: var(--topbar-height);
    }
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
        sort, fetch, className, isLoading, none,
        inDialog, hasStats, hasTabs, hasFilter, noSorting, hasIDs, children,
    } = props;

    const [ menuID,   setMenuID   ] = React.useState(null);
    const [ menuTop,  setMenuTop  ] = React.useState(null);
    const [ menuLeft, setMenuLeft ] = React.useState(null);
    const [ menuDir,  setMenuDir  ] = React.useState(null);


    // Handles the Click
    const handleClick = (elem, elemID) => {
        if (elem.onClick) {
            elem.onClick(elemID);
        } else if (elem.onAction) {
            elem.onAction(elem.act, elemID);
        } else if (elem.route) {
            Href.goto(elem.route, elemID);
        }
    };

    // Handles the Row Click
    const handleRowClick = (elemID) => {
        if (firstAction.action && menuID === null && !Utils.hasSelection()
            && (!firstAction.hide || !firstAction.hide(elemID))) {
            handleClick(firstAction, elemID);
        }
    };

    // Handles the Menu Open
    const handleMenuOpen = (menuID, menuTop, menuLeft, menuDir = "right") => {
        setMenuID(menuID);
        setMenuTop(menuTop);
        setMenuLeft(menuLeft);
        setMenuDir(menuDir);
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
    const actions     = [];
    const items       = [];
    let   firstAction = {};
    let   colSpan     = 0;
    let   hasContent  = false;
    let   hasPaging   = false;
    let   hasActions  = false;

    for (const child of Utils.toArray(children)) {
        if (child.type === TableHead) {
            colSpan = child.props.children.length;
        }
        if (child.type === TableBody) {
            hasContent = child.props.children && child.props.children.length > 0;
        }
        if (child.type === TablePaging) {
            hasPaging = true;
        }
        if (child.type === TableActionList) {
            for (const tableAction of Utils.toArray(child.props.children)) {
                const action = { ...tableAction.props };
                action.act = Action.get(action.action);
                if (!action.isHidden && ((action.act.isCED && child.props.canEdit) || !action.act.isCED)) {
                    hasActions = true;
                    if (!action.route && !action.onClick) {
                        action.onClick  = child.props.onClick;
                        action.onAction = child.props.onAction;
                    }
                    if (!firstAction.action) {
                        firstAction = action;
                    }
                    if (!menuID || !action.hide || !action.hide(menuID)) {
                        actions.push(action);
                    }
                }
            }
            break;
        }
    }

    const showMenu   = hasActions && Boolean(menuID !== null && menuTop);
    const hasSorting = !noSorting && !Utils.isEmpty(sort);
    if (hasActions) {
        colSpan += 1;
    }
    
    // Get the Children
    for (const [ key, child ] of Utils.getChildren(children)) {
        if (child.type !== TableActionList) {
            items.push(React.cloneElement(child, {
                key, fetch, sort, colSpan,
                hasIDs, hasActions, hasSorting, hasPaging, hasTabs,
                handleRowClick, handleMenuOpen,
            }));
        }
    }

    
    if (isLoading) {
        return <CircularLoader top={40} />;
    }
    if (!hasContent && none) {
        return <NoneAvailable message={none} />;
    }
    return <>
        <Wrapper>
            <Container
                className={className}
                inDialog={inDialog}
                hasStats={hasStats}
                hasTabs={hasTabs}
                hasFilter={hasFilter}
                hasPaging={hasPaging}
            >
                {items}
            </Container>
        </Wrapper>

        <Menu
            open={showMenu}
            top={menuTop}
            left={menuLeft}
            direction={menuDir}
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
    fetch     : PropTypes.func,
    sort      : PropTypes.object,
    none      : PropTypes.string.isRequired,
    className : PropTypes.string,
    isLoading : PropTypes.bool,
    inDialog  : PropTypes.bool,
    hasStats  : PropTypes.bool,
    hasTabs   : PropTypes.bool,
    hasFilter : PropTypes.bool,
    hasIDs    : PropTypes.bool,
    noSorting : PropTypes.bool,
    notFixed  : PropTypes.bool,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Table.defaultProps = {
    className : "",
    sort      : {},
    isLoading : false,
    hasStats  : false,
    hasTabs   : false,
    hasFilter : false,
    hasIDs    : false,
    noSorting : false,
    notFixed  : false,
};

export default Table;
