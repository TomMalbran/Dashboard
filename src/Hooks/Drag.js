import React                from "react";

// Core & Utils
import Utils                from "../Utils/Utils";



/**
 * The Drag Hook
 * @param {Function} onDrop
 * @returns {Object}
 */
function useDrag(onDrop) {
    const stateRef = React.useRef({
        isDragging    : false,
        node          : null,
        nodeBounds    : {},
        wrapper       : null,
        wrapperBounds : {},
        startX        : 0,
        startY        : 0,
        diffX         : 0,
        diffY         : 0,
        gap           : 0,
        newOrder      : 0,
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
            startX        : e.clientX,
            startY        : e.clientY,
            diffX         : 0,
            diffY         : 0,
            gap           : 0,
            newOrder      : origOrder,
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
        const childCount    = wrapper.children.length;
        const gap           = (wrapperBounds.height - nodeBounds.height * childCount) / (childCount - 1);

        stateRef.current.isDragging    = true;
        stateRef.current.nodeBounds    = nodeBounds;
        stateRef.current.wrapperBounds = wrapperBounds;
        stateRef.current.gap           = gap;
        stateRef.current.diffX         = startX - nodeBounds.left;
        stateRef.current.diffY         = startY - nodeBounds.top;

        node.style.boxSizing = "border-box";
        node.style.position  = "fixed";
        node.style.top       = `${nodeBounds.top}px`;
        node.style.left      = `${nodeBounds.left}px`;
        node.style.width     = `${nodeBounds.width}px`;
        node.style.zIndex    = 10000;

        if (node.nextSibling) {
            node.nextSibling.style.marginTop = `${nodeBounds.height + gap}px`;
        } else {
            node.previousSibling.style.marginBottom = `${nodeBounds.height + gap}px`;
        }
    };

    // Does the Drag Move Action
    const move = (e) => {
        const { node, wrapper, startX, startY, diffY, gap, origOrder, nodeBounds, wrapperBounds } = stateRef.current;

        const posX = e.clientX - startX;
        const posY = e.clientY - startY;

        node.style.transform = `translate(${posX}px, ${posY}px)`;

        if (Utils.inBounds(e.clientX, e.clientY, wrapperBounds)) {
            const nodeTop  = e.clientY - diffY;
            let   newOrder = 0;

            for (const child of wrapper.children) {
                const bounds = child.getBoundingClientRect();
                if ((nodeTop + nodeBounds.height / 2) > (bounds.top + bounds.height / 2)) {
                    newOrder++;
                }
            }

            for (const [ index, child ] of Object.entries(wrapper.children)) {
                if (child === node) {
                    continue;
                }
                child.style.transform = "";

                const currIndex = Number(index);
                const translate = nodeBounds.height + gap;
                if (currIndex <= newOrder && currIndex > origOrder) {
                    child.style.transform = `translateY(${-translate}px)`;
                } else if (currIndex >= newOrder && currIndex < origOrder) {
                    child.style.transform = `translateY(${translate}px)`;
                }
            }
            stateRef.current.newOrder = newOrder;
        }
    };

    // Drops the Element
    const drop = () => {
        const { wrapper, itemID, newOrder } = stateRef.current;

        stateRef.current.isDragging = false;
        for (const child of wrapper.children) {
            child.style.position     = "";
            child.style.top          = "";
            child.style.left         = "";
            child.style.width        = "";
            child.style.marginTop    = "";
            child.style.marginBottom = "";
            child.style.zIndex       = "";
            child.style.transform    = "";
        }

        window.removeEventListener("mousemove", drag);
        window.removeEventListener("mouseup",   drop);

        if (orderChanged()) {
            onDrop(itemID, newOrder);
        }
    };



    // Swaps 2 Elements
    const swap = (elements) => {
        const { newOrder, origOrder } = stateRef.current;
        const item = elements[origOrder];
        elements.splice(origOrder, 1);
        elements.splice(newOrder, 0, item);
    };

    // Returns true if the order changed
    const orderChanged = () => {
        const { newOrder, origOrder } = stateRef.current;
        return newOrder !== origOrder;
    };

    // Returns true if the given item should be displayed
    const show = (newItemID) => {
        const { isDragging, itemID } = stateRef.current;
        return !isDragging || (isDragging && itemID !== newItemID);
    };

    // Returns true if the moved element is the first
    const isFirst = () => {
        const { isDragging, newOrder } = stateRef.current;
        return isDragging && newOrder === 0;
    };

    // Returns true if the moved element comes after the given one
    const isNext = (index) => {
        const { isDragging, newOrder } = stateRef.current;
        return isDragging && newOrder === index + 1;
    };

    // Returns true if the moved element comes after the given one
    const isBefore = (index) => {
        const { isDragging, newOrder, origOrder } = stateRef.current;
        return isDragging && origOrder >= newOrder && newOrder === index;
    };

    // Returns true if the moved element comes after the given one
    const isAfter = (index) => {
        const { isDragging, newOrder, origOrder } = stateRef.current;
        return isDragging && origOrder < newOrder && newOrder === index;
    };



    // The public API
    return {
        pick,
        drag,
        swap,
        orderChanged,
        show,
        isFirst,
        isNext,
        isBefore,
        isAfter,
    };
}

export default useDrag;
