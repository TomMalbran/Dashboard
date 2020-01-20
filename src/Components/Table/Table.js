import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Core & Utils
import Utils                from "../../Utils/Utils";

// Components
import TableHead            from "../Table/TableHead";
import TablePaging          from "../Table/TablePaging";
import TableActions         from "../Table/TableActions";
import Menu                 from "../Menu/Menu";
import MenuItem             from "../Menu/MenuItem";
import CircularLoader       from "../Common/CircularLoader";
import NoneAvailable        from "../Common/NoneAvailable";



// Styles
const Wrapper = Styled.div`
    position: relative;
`;

const Container = Styled.table.attrs(({ hasStats, hasTabs, hasFilter, hasPaging }) => ({ hasStats, hasTabs, hasFilter, hasPaging }))`
    display: flex;
    flex-direction: column;
    width: 100%;
    table-layout: fixed;

    --table-header-height: 31px;
    --table-stats-height: ${(props) => props.hasStats ? "var(--stats-height)" : "0px"};
    --table-tabs-height: ${(props) => props.hasTabs ? "var(--tabs-table)" : "0px"};
    --table-filter-height: ${(props) => props.hasFilter ? "calc(var(--filter-height) + 16px)" : "0px"};
    --table-paging-height: ${(props) => props.hasPaging ? "40px" : "0px"};

    ${(props) => props.hasPaging && "border-bottom: none;"}
`;

const TableLoader = Styled(CircularLoader)`
    padding-top: 40px;
`;



/**
 * The Table Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Table(props) {
    const {
        sort, fetch, history, onClick, route, cantClick,
        className, isLoading, hasContent, none, hasStats, hasTabs, hasFilter,
        noSorting, hasIDs, children,
    } = props;

    const [ menuID,   setMenuID   ] = React.useState(null);
    const [ menuTop,  setMenuTop  ] = React.useState(null);
    const [ menuLeft, setMenuLeft ] = React.useState(null);
    const [ menuDir,  setMenuDir  ] = React.useState(null);

    // Creates a Sort handler to handle Sorting
    const handleSort = (orderBy, orderAsc = null) => {
        let params = sort;
        if (orderAsc !== null) {
            params = { ...sort, orderBy, orderAsc };
        } else if (sort.orderBy === orderBy) {
            params = { ...sort, orderAsc : sort.orderAsc ? 0 : 1 };
        } else {
            params = { ...sort, orderBy, orderAsc : 1 };
        }
        fetch(params);
    };

    // Handles the Page Change
    const handlePage = (page) => {
        const params = { ...sort, page };
        fetch(params);
    };

    // Handles the Amount Change
    const handleAmount = (amount) => {
        const params = { ...sort, amount };
        fetch(params);
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

    // Handles the Menu Click
    const handleMenuClick = (action, elemID, onClick, route) => () => {
        if (onClick) {
            onClick(action, elemID);
        } else if (route) {
            history.push(`${route}/${elemID}`);
        }
    };

    // Close the Menu if the Filter Changes
    React.useEffect(() => {
        if (sort && sort.filter && menuID) {
            handleMenuClose();
        }
    }, [ sort ]);
    


    // Get the Actions and ColSpan
    const actions   = [];
    const items     = [];
    let   colSpan   = 0;
    let   hasPaging = false;

    for (const child of Utils.toArray(children)) {
        if (child.type === TableHead) {
            colSpan = child.props.children.length;
        }
        if (child.type === TablePaging) {
            hasPaging = true;
        }
        if (child.type === TableActions) {
            for (const action of Utils.toArray(child.props.children)) {
                if (!action.props.isHidden || !action.props.isHidden(menuID)) {
                    const item = { ...action.props };
                    if (!item.route && !item.onClick) {
                        item.onClick = child.props.onClick;
                    }
                    if ((item.action.isCED && child.props.canEdit) || !item.action.isCED) {
                        actions.push(item);
                    }
                }
            }
            break;
        }
    }

    const hasActions = actions.length > 0;
    const showMenu   = hasActions && Boolean(menuID !== null && menuTop);
    const hasSorting = !noSorting && !Utils.isEmpty(sort);
    if (hasActions) {
        colSpan += 1;
    }
    
    // Get the Children
    for (const [ key, child ] of Utils.getChildren(children)) {
        if (child.type !== TableActions) {
            items.push(React.cloneElement(child, {
                key, onClick, route, cantClick, sort, colSpan, menuID,
                hasIDs, hasActions, hasSorting,
                handleSort, handlePage, handleAmount, handleMenuOpen,
            }));
        }
    }

    
    if (isLoading) {
        return <TableLoader />;
    }
    if (!hasContent) {
        return <NoneAvailable message={none} />;
    }
    return <>
        <Wrapper>
            <Container
                className={className}
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
            {actions.map(({ action, message, onClick, route }, index) => <MenuItem
                key={index}
                icon={action.icon}
                message={message}
                onClick={handleMenuClick(action, menuID, onClick, route)}
            />)}
        </Menu>
    </>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Table.propTypes = {
    history    : PropTypes.object.isRequired,
    fetch      : PropTypes.func,
    sort       : PropTypes.object.isRequired,
    none       : PropTypes.string.isRequired,
    className  : PropTypes.string,
    onClick    : PropTypes.func,
    cantClick  : PropTypes.func,
    route      : PropTypes.string,
    showLoader : PropTypes.bool,
    isLoading  : PropTypes.bool,
    hasContent : PropTypes.bool,
    hasStats   : PropTypes.bool,
    hasTabs    : PropTypes.bool,
    hasFilter  : PropTypes.bool,
    hasIDs     : PropTypes.bool,
    noSorting  : PropTypes.bool,
    notFixed   : PropTypes.bool,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Table.defaultProps = {
    className  : "",
    hasContent : false,
};

export default withRouter(Table);
