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
const Backdrop = Styled.div.attrs(({ isSubmenu }) => ({ isSubmenu }))`
    display: block;
    position: fixed;
    inset: 0;
    z-index: var(--z-menu);
    ${(props) => props.isSubmenu && "pointer-events: none;"}
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
    pointer-events: all;

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
        selected, bottom, gap, onAction, onClose, targetRef,
        onMouseEnter, onMouseLeave, isSubmenu, children,
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
    const dir       = direction || "";
    const forTop    = dir.includes("top");
    const forBottom = dir.includes("bottom");
    const forLeft   = dir.includes("left");

    if (!hasStyles && targetRef) {
        const bounds = Utils.getBounds(targetRef);
        if (forTop) {
            top = bounds.top - gap;
        } else if (forBottom) {
            top = bounds.bottom + gap;
        } else {
            top = bounds.top;
        }

        if (forTop || forBottom) {
            if (forLeft) {
                right = window.innerWidth - bounds.right;
            } else {
                left = bounds.left;
            }
        } else {
            if (forLeft) {
                right = window.innerWidth - bounds.left;
            } else {
                left = bounds.right;
            }
        }
        hasStyles = true;
    }

    if (hasStyles) {
        if (top && forTop) {
            top -= height;
        }
        if (left && forLeft) {
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

        if (top && top < 0) {
            top = 0;
        } else if (top && height && top + height > window.innerHeight) {
            top -= (top + height) - window.innerHeight;
        }
        if (left && left < 0) {
            left = 10;
        } else if (left && width && left + width > window.innerWidth) {
            left -= (left + width) - window.innerWidth;
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
    return <Backdrop
        isSubmenu={isSubmenu}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={handleClose}
    >
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
    onMouseEnter : PropTypes.func,
    onMouseLeave : PropTypes.func,
    isSubmenu    : PropTypes.bool,
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
    isSubmenu  : false,
};

export default Menu;
