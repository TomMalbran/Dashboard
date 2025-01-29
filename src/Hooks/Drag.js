import React                from "react";

// Utils
import Utils                from "../Utils/Utils";



/**
 * The Drag Hook
 * @param {Function} onDrop
 * @param {Boolean=} gridMode
 * @returns {Object}
 */
function useDrag(onDrop, gridMode = false) {
    const stateRef = React.useRef({
        isDragging    : false,
        node          : null,
        nodeBounds    : {},
        wrapper       : null,
        wrapperBounds : {},
        children      : [],
        isChild       : false,
        startX        : 0,
        startY        : 0,
        diffX         : 0,
        diffY         : 0,
        gap           : 0,
        columns       : 1,
        newOrder      : null,
        origOrder     : 0,
        itemID        : null,
    });


    // Picks an Element
    const pick = (e, node, wrapper, itemID, origOrder) => {
        if (e.button !== 0) {
            return false;
        }

        stateRef.current = {
            node, wrapper, itemID, origOrder,

            isDragging    : false,
            nodeBounds    : {},
            wrapperBounds : {},
            children      : [],
            isChild       : false,
            startX        : e.clientX,
            startY        : e.clientY,
            diffX         : 0,
            diffY         : 0,
            gap           : 0,
            columns       : 1,
            newOrder      : null,
        };

        window.addEventListener("mousemove", drag);
        window.addEventListener("mouseup",   drop);
        return true;
    };

    // Drags the Element
    const drag = (e) => {
        const { isDragging } = stateRef.current;

        if (!isDragging) {
            start(e);
        }
        move(e);

        Utils.unselectAll();
        e.preventDefault();
        e.stopPropagation();
    };

    // Starts a Drag Action
    const start = (e) => {
        const { node, wrapper, startX, startY } = stateRef.current;

        const posX = e.clientX - startX;
        const posY = e.clientY - startY;
        const dist = posX * posX + posY * posY;

        if (dist <= 25) {
            return;
        }

        const nodeBounds    = node.getBoundingClientRect();
        const wrapperBounds = wrapper.getBoundingClientRect();
        const children      = [ ...wrapper.children ];
        const isChild       = children.findIndex((elem) => elem === node) > -1;

        stateRef.current.isDragging    = true;
        stateRef.current.nodeBounds    = nodeBounds;
        stateRef.current.wrapperBounds = wrapperBounds;
        stateRef.current.children      = children;
        stateRef.current.isChild       = isChild;
        stateRef.current.diffX         = startX - nodeBounds.left;
        stateRef.current.diffY         = startY - nodeBounds.top;

        if (gridMode) {
            startGrid();
        } else {
            startList();
        }
    };

    // Start the List Drag
    const startList = () => {
        const { node, nodeBounds, wrapperBounds, isChild, children } = stateRef.current;

        const childCount = children.length;
        const gap        = (wrapperBounds.height - nodeBounds.height * childCount) / (childCount - 1);
        const height     = nodeBounds.height + gap;

        stateRef.current.gap = gap;

        // Set the Node Styles for dragging
        node.style.boxSizing = "border-box";
        node.style.position  = "fixed";
        node.style.top       = `${nodeBounds.top}px`;
        node.style.left      = `${nodeBounds.left}px`;
        node.style.width     = `${nodeBounds.width}px`;
        node.style.zIndex    = 10000;

        // Make space for the Node
        if (node.nextSibling) {
            node.nextSibling.style.marginTop = `${height}px`;
        } else if (node.previousSibling) {
            node.previousSibling.style.marginBottom = `${height}px`;
        }

        // The Node is not a Child of the Wrapper
        if (!isChild) {
            stateRef.current.origOrder = childCount;
            if (childCount > 0) {
                children[childCount - 1].marginBottom = `${height}px`;
            }
            children.push(node);
        }
    };

    // Start the Grid Drag
    const startGrid = () => {
        const { node, nodeBounds, wrapperBounds } = stateRef.current;

        const columns = Math.floor(wrapperBounds.width / nodeBounds.width);
        const gap     = Math.round((wrapperBounds.width - columns * nodeBounds.width) / (columns - 1));

        stateRef.current.columns = columns;
        stateRef.current.gap     = gap;

        node.style.zIndex = 10000;
    };



    // Does the Drag Move Action
    const move = (e) => {
        const { node, startX, startY } = stateRef.current;

        const posX = e.clientX - startX;
        const posY = e.clientY - startY;
        node.style.transform = `translate(${posX}px, ${posY}px)`;

        stateRef.current.newOrder = null;
        if (!inBounds(e.clientX, e.clientY)) {
            return;
        }

        if (gridMode) {
            setGridOrder(e.clientX, e.clientY);
        } else {
            setListOrder(e.clientY);
        }
    };

    // Returns true if the given Point is in the Bounds
    const inBounds = (x, y) => {
        const { nodeBounds, wrapperBounds } = stateRef.current;
        const extra = nodeBounds.height * 2;
        return (
            y > wrapperBounds.top && y < wrapperBounds.bottom + extra &&
            x > wrapperBounds.left && x < wrapperBounds.right
        );
    };

    // Sets the new Order for a List
    const setListOrder = (clientY) => {
        const { node, children, diffY, gap, origOrder, nodeBounds } = stateRef.current;

        const nodeTop  = clientY - diffY;
        let   newOrder = 0;

        for (const child of children) {
            const bounds = child.getBoundingClientRect();
            if ((nodeTop + nodeBounds.height / 2) > (bounds.top + bounds.height / 2)) {
                newOrder++;
            }
        }

        const translate = nodeBounds.height + gap;
        for (const [ index, child ] of Object.entries(children)) {
            if (child === node) {
                continue;
            }

            child.style.transform = "";
            if (newOrder === origOrder) {
                continue;
            }

            const childIndex = Number(index);
            if (childIndex <= newOrder && childIndex > origOrder) {
                child.style.transform = `translateY(${-translate}px)`;
            } else if (childIndex >= newOrder && childIndex < origOrder) {
                child.style.transform = `translateY(${translate}px)`;
            }
        }
        stateRef.current.newOrder = newOrder;
    };

    // Sets the new Order for a Grid
    const setGridOrder = (clientX, clientY) => {
        const { node, children, nodeBounds, wrapperBounds, gap, columns, origOrder } = stateRef.current;

        const relX       = clientX - wrapperBounds.left;
        const relY       = clientY - wrapperBounds.top;
        const newCol     = Math.floor(relX / nodeBounds.width);
        const newRow     = Math.floor(relY / nodeBounds.height);
        const newOrder   = newRow * columns + newCol;

        const translateX = nodeBounds.width  + gap;
        const translateY = nodeBounds.height + gap;

        for (const [ index, child ] of Object.entries(children)) {
            if (child === node) {
                continue;
            }

            child.style.transform = "";
            if (newOrder === origOrder) {
                continue;
            }

            const bounds     = child.getBoundingClientRect();
            const relX       = bounds.x - wrapperBounds.left;
            const childCol   = Math.floor(relX / nodeBounds.width);
            const childIndex = Number(index);

            if (childIndex <= newOrder && childIndex > origOrder) {
                if (childCol === 0) {
                    child.style.transform = `translate(${(columns - 1) * translateX}px, ${-translateY}px)`;
                } else {
                    child.style.transform = `translateX(${-translateX}px)`;
                }
            } else if (childIndex >= newOrder && childIndex < origOrder) {
                if (childCol === columns - 1) {
                    child.style.transform = `translate(${(columns - 1) * -translateX}px, ${translateY}px)`;
                } else {
                    child.style.transform = `translateX(${translateX}px)`;
                }
            }
        }

        stateRef.current.newOrder = Math.min(newOrder, children.length);
    };



    // Drops the Node
    const drop = () => {
        const { isDragging, isChild, node, children, itemID, newOrder } = stateRef.current;

        if (isDragging) {
            for (const child of children) {
                removeStyles(child);
            }
            if (!gridMode && !isChild) {
                if (node.nextSibling) {
                    removeStyles(node.nextSibling);
                } else if (node.previousSibling) {
                    removeStyles(node.previousSibling);
                }
            }
        }
        stateRef.current.isDragging = false;

        window.removeEventListener("mousemove", drag);
        window.removeEventListener("mouseup",   drop);

        onDrop(itemID, newOrder);
    };

    // Removes the Styles
    const removeStyles = (node) => {
        node.style.position     = "";
        node.style.top          = "";
        node.style.left         = "";
        node.style.width        = "";
        node.style.marginTop    = "";
        node.style.marginBottom = "";
        node.style.zIndex       = "";
        node.style.transform    = "";
    };



    // Returns true if the order was set
    const hasOrder = () => {
        const { newOrder } = stateRef.current;
        return newOrder !== null;
    };

    // Returns true if the order changed
    const orderChanged = () => {
        const { newOrder, origOrder } = stateRef.current;
        return newOrder !== null && newOrder !== origOrder;
    };

    // Swaps 2 Elements
    const swap = (elements) => {
        const { newOrder, origOrder } = stateRef.current;
        const item = elements[origOrder];
        elements.splice(origOrder, 1);
        elements.splice(newOrder, 0, item);
    };



    // The public API
    return { pick, hasOrder, orderChanged, swap };
}

export default useDrag;
