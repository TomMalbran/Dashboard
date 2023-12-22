import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";
import KeyCode              from "../../Utils/KeyCode";

// Components
import InputField           from "../Form/InputField";

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

const Ul = Styled.ul.attrs(({ withPos, isLeft, isRight, width, maxHeight }) => ({ withPos, isLeft, isRight, width, maxHeight }))`
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
    ${(props) => props.width && `width: ${props.width}px;`}

    ${(props) => props.maxHeight && `
        max-height: ${props.maxHeight}px;
        overflow-x: hidden;
        overflow-y: auto;
    `}
`;

const Li = Styled.li.attrs(({ atBottom }) => ({ atBottom }))`
    position: sticky;
    background-color: white;

    ${(props) => props.atBottom  && `
        bottom: -8px;
        margin-top: 8px;
        margin-bottom: -8px;
        padding-bottom: 8px;
    `}
    ${(props) => !props.atBottom && `
        top: -8px;
        margin-top: -8px;
        margin-bottom: 8px;
        padding-top: 8px;
    `}
`;



/**
 * The Menu Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Menu(props) {
    const {
        containerRef, className, open, variant, direction, iconHeight,
        bottom, gap, width, maxHeight, onAction, onClose, targetRef,
        withSearch, onMouseEnter, onMouseLeave, isSubmenu, children,
    } = props;
    let { top, left, right } = props;


    // Variables
    let   hasStyles = (top || bottom) && (left || right);
    const style     = {};

    // The References
    const contentRef = React.useRef();

    // The Current State
    const [ boundWidth,  setBoundWidth  ] = React.useState(0);
    const [ boundHeight, setBoundHeight ] = React.useState(0);
    const [ filter,      setFilter      ] = React.useState("");
    const [ selectedIdx, setSelectedIdx ] = React.useState(-1);
    const [ trigger,     setTrigger     ] = React.useState(false);

    // Clone the children
    const items = [];
    let   index = 0;
    for (const child of children) {
        const { act, title, message } = child.props;
        const titleMsg   = NLS.get(title || "");
        const contentMsg = NLS.get(message || act?.message || "");
        const isFiltered = Boolean(filter && !titleMsg.toLocaleLowerCase().includes(filter) && !contentMsg.toLocaleLowerCase().includes(filter));
        if (!isFiltered) {
            items.push(React.cloneElement(child, {
                key : index,
                index, selectedIdx, onAction, onClose,
                trigger, setTrigger,
            }));
            index += 1;
        }
    }


    // Save the Width and add the Close handler
    React.useEffect(() => {
        if (open) {
            const bounds = Utils.getBounds(contentRef);
            if (maxHeight) {
                setBoundHeight(Math.min(bounds.height, maxHeight));
            } else {
                setBoundHeight(bounds.height);
            }
            setBoundWidth(width || bounds.width);
        }
    }, [ open, filter ]);


    // Handles the Menu Close
    const handleClose = (e) => {
        if (!open || Utils.inRef(e.clientX, e.clientY, contentRef)) {
            return;
        }
        setFilter("");
        onClose();
        e.stopPropagation();
        e.preventDefault();
    };

    // Handles the Menu Search
    const handleSearch = (name, value) => {
        setFilter(value.toLocaleLowerCase());
        setSelectedIdx(-1);
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        switch (e.keyCode) {
        case KeyCode.DOM_VK_DOWN: {
            const newSelectedIdx = (selectedIdx + 1) % items.length;
            setSelectedIdx(newSelectedIdx);
            e.preventDefault();
            break;
        }
        case KeyCode.DOM_VK_UP: {
            const newSelectedIdx = (selectedIdx - 1) < 0 ? items.length - 1 : selectedIdx - 1;
            setSelectedIdx(newSelectedIdx);
            e.preventDefault();
            break;
        }
        default:
        }
    };

    // Handles the Key Down
    const handleKeyUp = (e) => {
        if (e.keyCode === KeyCode.DOM_VK_RETURN && selectedIdx >= 0) {
            setTrigger(true);
        }
        e.preventDefault();
    };

    // Handles the Click to prevent
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


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
            top -= boundHeight;
        }
        if (left && forLeft) {
            left -= boundWidth;
        }

        if (containerRef && boundWidth) {
            const bounds = Utils.getBounds(containerRef);
            if (top + boundHeight > bounds.bottom) {
                top -= boundHeight - iconHeight;
            }
            if (left && left + boundWidth > bounds.right) {
                left -= boundWidth;
            }
            if (right && right - boundWidth < bounds.left) {
                right += boundWidth;
            }
        }

        if (top && top < 0) {
            top = 0;
        } else if (top && boundHeight && top + boundHeight > window.innerHeight) {
            top -= (top + boundHeight) - window.innerHeight;
        }
        if (left && left < 0) {
            left = 10;
        } else if (left && boundWidth && left + boundWidth > window.innerWidth) {
            left -= (left + boundWidth) - window.innerWidth;
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


    // Do the Render
    const showSearch   = withSearch && (filter || items.length > 5);
    const bottomSearch = showSearch && forTop;

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
            width={width}
            onClick={handleClick}
            maxHeight={maxHeight}
            style={style}
        >
            {bottomSearch && items}
            {showSearch && <Li atBottom={bottomSearch}>
                <InputField
                    name="search"
                    icon="search"
                    placeholder="GENERAL_SEARCH"
                    value={filter}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    autoFocus
                    isSmall
                />
            </Li>}
            {!bottomSearch && items}
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
    width        : PropTypes.number,
    maxHeight    : PropTypes.number,
    withSearch   : PropTypes.bool,
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
    width      : 0,
    maxHeight  : 0,
    withSearch : false,
    isSubmenu  : false,
};

export default Menu;
