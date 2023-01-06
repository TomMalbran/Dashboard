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
const Ul = Styled.ul.attrs(({ isOpen, withPos, isLeft, isRight }) => ({ isOpen, withPos, isLeft, isRight }))`
    display: none;
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    transform: translateY(-26px);
    background-color: var(--lighter-gray);
    border-radius: var(--border-radius);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
    overflow: hidden;
    z-index: var(--z-menu);

    ${(props) => props.isOpen  && "display: block;"}
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
        selected, bottom, onAction, onClose, forRef, children,
    } = props;
    let { top, left, right } = props;

    const menuRef   = React.useRef();
    const hasStyles = (top || bottom) && (left || right);
    const style     = {};

    // The State
    const [ width,  setWidth  ] = React.useState(0);
    const [ height, setHeight ] = React.useState(0);


    // Close the Menu
    const handleClose = (e) => {
        if (!open) {
            return;
        }
        if (forRef && Utils.inRef(e.clientX, e.clientY, forRef)) {
            return;
        }
        if (menuRef && Utils.inRef(e.clientX, e.clientY, menuRef)) {
            return;
        }
        onClose();
        e.stopPropagation();
        e.preventDefault();
    };

    // Save the Width and add the Close handler
    React.useEffect(() => {
        if (open) {
            const bounds = Utils.getBounds(menuRef);
            setWidth(bounds.width);
            setHeight(bounds.height);
            window.addEventListener("click", handleClose);
            return () => window.removeEventListener("click", handleClose);
        }
        return () => {};
    }, [ open ]);


    // Set the position
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


    return <Ul
        ref={menuRef}
        className={className}
        isOpen={open}
        withPos={hasStyles}
        isLeft={!hasStyles && variant === Variant.LEFT}
        isRight={!hasStyles && variant === Variant.RIGHT}
        style={style}
    >
        {items}
    </Ul>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Menu.propTypes = {
    containerRef : PropTypes.any,
    open         : PropTypes.bool,
    variant      : PropTypes.string,
    className    : PropTypes.string,
    direction    : PropTypes.string,
    top          : PropTypes.number,
    bottom       : PropTypes.number,
    left         : PropTypes.number,
    right        : PropTypes.number,
    iconHeight   : PropTypes.number,
    selected     : PropTypes.number,
    onAction     : PropTypes.func,
    onClose      : PropTypes.func.isRequired,
    forRef       : PropTypes.any,
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
};

export default Menu;
