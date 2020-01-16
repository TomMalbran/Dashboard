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
    z-index: 1;
    transform: translateY(-26px);
    background-color: var(--lighter-gray);
    border-radius: var(--border-radius);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;

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
        className, open, variant, direction, top, left, right,
        selected, onAction, onClose, children,
    } = props;

    const menuRef   = React.useRef();
    const hasStyles = top && (left || right);
    const items     = [];
    const style     = {};
    
    // The State
    const [ width, setWidth ] = React.useState(0);


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
            window.addEventListener("click", handleClose);
            return () => window.removeEventListener("click", handleClose);
        }
        return () => {};
    }, [ open ]);


    for (const [ key, child ] of Utils.getChildren(children)) {
        items.push(React.cloneElement(child, {
            key, onAction, onClose,
            index      : key,
            isSelected : key === selected,
        }));
    }

    if (hasStyles) {
        style.top =`${top}px`;
        if (left) {
            const newLeft = (direction === "left") ? left - width : left;
            style.left = `${newLeft}px`;
        }
        if (right) {
            style.right = `${right}px`;
        }
    }
    

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
    open      : PropTypes.bool,
    variant   : PropTypes.string,
    className : PropTypes.string,
    direction : PropTypes.string,
    top       : PropTypes.number,
    left      : PropTypes.number,
    right     : PropTypes.number,
    selected  : PropTypes.number,
    onAction  : PropTypes.func,
    onClose   : PropTypes.func.isRequired,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Menu.defaultProps = {
    open      : false,
    variant   : Variant.RIGHT,
    className : "",
    direction : "",
};

export default Menu;
