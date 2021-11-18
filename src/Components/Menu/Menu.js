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
    z-index: 1;

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
        selected, onAction, onClose, children,
    } = props;
    let { top, left, right } = props;

    const menuRef   = React.useRef();
    const hasStyles = top && (left || right);
    const style     = {};

    // The State
    const [ width,  setWidth  ] = React.useState(0);
    const [ height, setHeight ] = React.useState(0);


    // Close the Menu
    const handleClose = (e) => {
        if (open && menuRef.current) {
            const bounds = Utils.getBounds(menuRef);
            if (e.clientX < bounds.left || e.clientX > bounds.right ||
                e.clientY < bounds.top  || e.clientY > bounds.bottom) {
                onClose();
                e.stopPropagation();
                e.preventDefault();
            }
        }
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
        if (left) {
            left = (direction === "left") ? left - width : left;
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

        style.top = `${top}px`;
        if (left) {
            style.left = `${left}px`;
        }
        if (right) {
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
    left         : PropTypes.number,
    right        : PropTypes.number,
    iconHeight   : PropTypes.number,
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
};

export default Menu;
