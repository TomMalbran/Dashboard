import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import NoneAvailable        from "../Common/NoneAvailable";
import CircularLoader       from "../Loader/CircularLoader";
import Breadcrumb           from "../Header/Breadcrumb";
import MediaItem            from "../Media/MediaItem";



// Styles
const Div = Styled.div.attrs(({ inDialog, withSpace }) => ({ inDialog, withSpace }))`
    color: var(--media-main-color);
    ${(props) => props.inDialog && `
        min-height: calc(130px * 2 + 8px + 16px + 12px);
    `}
    ${(props) => props.withSpace && "padding-top: 24px;"}
`;

const Section = Styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-auto-rows: 1fr;
    gap: 8px;
    padding-top: 12px;
`;



/**
 * The Media List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MediaList(props) {
    const {
        className, onAction, onDrop, isLoading,
        canEdit, canSelect, canDrag, inDialog, withSpace,
        selectedPath, selectedPaths, items, path,
    } = props;


    // The Current State
    const [ isDragging, setDragging   ] = React.useState(false);
    const [ isMoving,   setMoving     ] = React.useState(false);
    const [ dragIndex,  setDragIndex  ] = React.useState(0);
    const [ startX,     setStartX     ] = React.useState(0);
    const [ startY,     setStartY     ] = React.useState(0);
    const [ diffX,      setDiffX      ] = React.useState(0);
    const [ diffY,      setDiffY      ] = React.useState(0);
    const [ posX,       setPosX       ] = React.useState(0);
    const [ posY,       setPosY       ] = React.useState(0);
    const [ width,      setWidth      ] = React.useState(0);
    const [ requestRAF, setRequestRAF ] = React.useState(false);

    // Variables
    const showLoader = isLoading;
    const showNone   = Boolean(!isLoading && !items.length);
    const showItems  = Boolean(!isLoading && items.length);


    // Handles the Breadcrumb links
    const handleBreadcrumb = (href) => {
        if (onAction) {
            const path = href === "/" ? "" : href;
            onAction(Action.get("VIEW"), { isDir : true, path });
        }
    };

    // Handles the Grab
    const handleGrab = (e, elem, index) => {
        if (!canDrag || isDragging || elem.isBack || elem.isDir || e.nativeEvent.which !== 1) {
            return;
        }
        setDragging(true);
        setRequestRAF(true);
        setDragIndex(index);
        setStartX(e.clientX);
        setStartY(e.clientY);
    };

    // Handles the Drag
    const handleDrag = (e) => {
        if (!isDragging) {
            return;
        }
        if (!isMoving) {
            startDrag(e);
            return;
        }
        animateDrag(e);
        if (requestRAF) {
            setRequestRAF(false);
        }
    };

    // Handles the Drag Start
    const startDrag = (e) => {
        const currX = e.clientX - startX;
        const currY = e.clientY - startY;
        const dist  = currX * currX + currY * currY;

        if (dist <= 25) {
            return;
        }
        const node   = document.querySelector(`.media-item-${dragIndex}`);
        const bounds = node.getBoundingClientRect();

        setMoving(true);
        setWidth(bounds.width);
        setDiffX(startX - bounds.left);
        setDiffY(startY - bounds.top);
        setPosX(e.clientX - startX + bounds.left);
        setPosY(e.clientY - startY + bounds.top);
    };

    // Handles the Drag Animated
    const animateDrag = (e) => {
        setPosX(e.clientX - diffX);
        setPosY(e.clientY - diffY);
        setRequestRAF(true);

        e.preventDefault();
        e.stopPropagation();
        Utils.unselectAll();
    };

    // Handles the Drop
    const handleDrop = (e) => {
        if (!isDragging) {
            return;
        }
        setDragging(false);
        if (!isMoving) {
            return;
        }
        setMoving(false);

        for (const [ index, elem ] of items.entries()) {
            if (elem.isBack || elem.isDir) {
                const node   = document.querySelector(`.media-item-${index}`);
                const bounds = node.getBoundingClientRect();
                if (Utils.inBounds(e.clientX, e.clientY, bounds)) {
                    onDrop(items[dragIndex], elem);
                    break;
                }
            }
        }
    };

    // Returns true if the elem is selected
    const isSelected = (elem) => {
        if (!canSelect || elem.isBack) {
            return false;
        }
        if (selectedPaths && selectedPaths.length && selectedPaths.includes(elem.path)) {
            return true;
        }
        if (selectedPath && selectedPath === elem.path) {
            return true;
        }
        return false;
    };

    // Adds the Listeners
    React.useEffect(() => {
        window.addEventListener("mousemove", handleDrag);
        window.addEventListener("mouseup",   handleDrop);
        return () => {
            window.removeEventListener("mousemove", handleDrag);
            window.removeEventListener("mouseup",   handleDrop);
        };
    });


    // Calculate some Styles
    const style = {};
    if (isMoving) {
        style.position = "absolute";
        style.width    = `${width}px`;
        style.top      = `${posY}px`;
        style.left     = `${posX}px`;
        style.zIndex   = 1000;
    }


    // Do the Render
    return <Div className={className} inDialog={inDialog} withSpace={withSpace}>
        {showLoader && <CircularLoader />}
        {showNone   && <NoneAvailable message="MEDIA_NONE_AVAILABLE" />}
        {showItems  && <>
            <Breadcrumb route={path} onClick={handleBreadcrumb} />
            <Section>
                {items.map((elem, index) => {
                    const isCurrent = isMoving && index === dragIndex;
                    return <MediaItem
                        key={index}
                        elem={elem}
                        className={`media-item-${index}`}
                        style={isCurrent ? style : null}
                        isSelected={isSelected(elem)}
                        hasActions={!isCurrent && canEdit && !elem.isBack}
                        onAction={onAction}
                        onMouseDown={(e) => handleGrab(e, elem, index)}
                    />;
                })}
            </Section>
        </>}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MediaList.propTypes = {
    className     : PropTypes.string,
    onAction      : PropTypes.func,
    onDrop        : PropTypes.func,
    isLoading     : PropTypes.bool,
    canSelect     : PropTypes.bool,
    canEdit       : PropTypes.bool,
    canDrag       : PropTypes.bool,
    inDialog      : PropTypes.bool,
    withSpace     : PropTypes.bool,
    selectedPath  : PropTypes.string,
    selectedPaths : PropTypes.arrayOf(PropTypes.string),
    items         : PropTypes.array,
    path          : PropTypes.string,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
MediaList.defaultProps = {
    className : "",
    isLoading : false,
    canSelect : false,
    canEdit   : false,
    canDrag   : false,
    inDialog  : false,
    withSpace : true,
};

export default MediaList;
