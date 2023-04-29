import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Variants
const Variant = {
    LEFT  : "left",
    RIGHT : "right",
};



// Styles
const Backdrop = Styled.div`
    display: block;
    box-sizing: border-box;
    position: fixed;
    inset: 0;
    z-index: var(--z-menu);
`;

const Ul = Styled.ul.attrs(({ withPos, isLeft, isRight }) => ({ withPos, isLeft, isRight }))`
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 8px;
    transform: translateY(-26px);
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;

    ${(props) => props.withPos && "transform: none;"}
    ${(props) => props.isLeft  && "left: 7px;"}
    ${(props) => props.isRight && "right: 7px;"}
`;



/**
 * The Menu Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Menu(props) {
    const {
        containerRef, className, open, variant, direction, iconHeight,
        selected, bottom, gap, onAction, onClose, targetRef, children,
    } = props;
    let { top, left, right } = props;

    let   hasStyles  = (top || bottom) && (left || right);
    const contentRef = React.useRef();
    const style      = {};

    // The State
    const [ width,  setWidth  ] = React.useState(0);
    const [ height, setHeight ] = React.useState(0);


    // Close the Menu
    const handleClose = (e) => {
        if (!open || Utils.inRef(e.clientX, e.clientY, contentRef)) {
            return;
        }
        onClose();
        e.stopPropagation();
        e.preventDefault();
    };

    // Save the Width and add the Close handler
    React.useEffect(() => {
        if (open) {
            const bounds = Utils.getBounds(contentRef);
            setWidth(bounds.width);
            setHeight(bounds.height);
        }
    }, [ open ]);


    // Set the position
    if (!hasStyles && targetRef) {
        const bounds = Utils.getBounds(targetRef);
        if (direction.includes("top")) {
            top = bounds.top - gap;
        } else {
            top = bounds.bottom + gap;
        }
        if (top && direction.includes("left")) {
            right = window.innerWidth - bounds.right;
        } else {
            left = bounds.left;
        }
        hasStyles = true;
    }

    if (hasStyles) {
        if (top && direction.includes("top")) {
            top -= height;
        }
        if (left && direction.includes("left")) {
            left -= width;
        }

        if (containerRef && width) {
            const bounds = Utils.getBounds(containerRef);
            if (top + height > bounds.bottom) {
                top -= height - iconHeight;
            }
            if (left && left + width > bounds.right) {
                left -= width;
            }
            if (right && right - width < bounds.left) {
                right += width;
            }
        }

        if (top) {
            style.top = `${top}px`;
        } else if (bottom) {
            style.bottom = `${bottom}px`;
        }
        if (left) {
            style.left = `${left}px`;
        } else if (right) {
            style.right = `${right}px`;
        }
    }

    // Clone the children
    const items = Utils.cloneChildren(children, (child, key) => ({
        onAction, onClose,
        index      : key,
        isSelected : key === selected,
    }));


    // Do the Render
    if (!open) {
        return <React.Fragment />;
    }
    return <Backdrop onMouseDown={handleClose}>
        <Ul
            ref={contentRef}
            className={className}
            withPos={hasStyles}
            isLeft={!hasStyles && variant === Variant.LEFT}
            isRight={!hasStyles && variant === Variant.RIGHT}
            style={style}
        >
            {items}
        </Ul>
    </Backdrop>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Menu.propTypes = {
    open         : PropTypes.bool,
    containerRef : PropTypes.any,
    targetRef    : PropTypes.any,
    variant      : PropTypes.string,
    className    : PropTypes.string,
    direction    : PropTypes.string,
    top          : PropTypes.number,
    bottom       : PropTypes.number,
    left         : PropTypes.number,
    right        : PropTypes.number,
    iconHeight   : PropTypes.number,
    gap          : PropTypes.number,
    selected     : PropTypes.number,
    onAction     : PropTypes.func,
    onClose      : PropTypes.func.isRequired,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Menu.defaultProps = {
    open       : false,
    variant    : Variant.RIGHT,
    className  : "",
    direction  : "",
    iconHeight : 0,
    gap        : 0,
};

export default Menu;
