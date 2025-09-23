import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Responsive           from "../../Core/Responsive";
import KeyCode              from "../../Utils/KeyCode";
import Utils                from "../../Utils/Utils";

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

const Container = Styled.div.attrs(({ withPos, isLeft, isRight, width }) => ({ withPos, isLeft, isRight, width }))`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 8px;
    transform: translateY(-26px);
    background-color: var(--white-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    max-width: calc(100vw - var(--main-padding) * 2);
    overflow-x: hidden;
    pointer-events: all;

    ${(props) => props.withPos && "transform: none;"}
    ${(props) => props.isLeft  && "left: 7px;"}
    ${(props) => props.isRight && "right: 7px;"}
    ${(props) => props.width && `width: ${props.width}px;`}
`;

const Content = Styled.ul`
    flex-grow: 2;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
`;

const Search = Styled.div.attrs(({ atBottom }) => ({ atBottom }))`
    ${(props) => props.atBottom && `
        padding-top: 8px;
    `}
    ${(props) => !props.atBottom && `
        padding-bottom: 8px;
    `}
`;

const Empty = Styled.li`
    padding: 8px;
`;



/**
 * The Menu Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Menu(props) {
    const {
        containerRef, className, open, variant, direction, iconHeight,
        top, left, right, bottom, gap, width, maxHeight, targetRef,
        useBottom, onAction, onClose, onMouseEnter, onMouseLeave,
        withSearch, emptyText, filterText, keyCode, isSubmenu, children,
    } = props;


    // The References
    const contentRef = React.useRef(null);

    // The Current State
    const [ boundWidth,  setBoundWidth  ] = React.useState(0);
    const [ boundHeight, setBoundHeight ] = React.useState(0);
    const [ selectedIdx, setSelectedIdx ] = React.useState(-1);
    const [ filter,      setFilter      ] = React.useState("");
    const [ trigger,     setTrigger     ] = React.useState(false);


    // Parse the Items
    const items = React.useMemo(() => {
        const items = [];
        let   key   = 0;
        let   index = 0;
        for (const child of Utils.getChildren(children)) {
            const { isHidden, act, title, message, isTitle } = child.props;
            const titleMsg   = NLS.get(title || "");
            const contentMsg = NLS.get(message || act?.message || "");
            const isFiltered = Boolean(filter && !titleMsg.toLocaleLowerCase().includes(filter) && !contentMsg.toLocaleLowerCase().includes(filter));

            if (!isHidden && !isFiltered) {
                const itemIndex = isTitle ? -1 : index;
                items.push(React.cloneElement(child, {
                    index : itemIndex,
                    key, selectedIdx, filter, onAction, onClose,
                    trigger, setTrigger,
                }));

                if (!isTitle) {
                    index += 1;
                }
                key += 1;
            }
        }
        return items;
    // }, [ children, filter, selectedIdx, onAction, onClose, trigger ]);
    }, [ children, filter, selectedIdx, trigger ]);


    // Remove the filter on Open
    React.useEffect(() => {
        if (open) {
            setFilter("");
            setSelectedIdx(-1);
        }
    }, [ open ]);

    // Set the custom filter
    React.useEffect(() => {
        if (!withSearch) {
            setFilter(filterText);
        }
    }, [ filterText ]);

    // Set the Key Code
    React.useEffect(() => {
        if (!withSearch) {
            const newKeyCode = keyCode % 1000;
            selectUsingKey(newKeyCode);
            submitUsingKey(newKeyCode);
        }
    }, [ keyCode ]);


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
        onClose();
        e.stopPropagation();
        e.preventDefault();
    };

    // Handles the Menu Search
    const handleSearch = (name, value) => {
        setFilter(value.toLocaleLowerCase());
        setSelectedIdx(0);
    };

    // Handles the Key Down
    const handleKeyDown = (e) => {
        if (selectUsingKey(e.keyCode)) {
            e.preventDefault();
        }
    };

    // Handles the Key Down
    const handleKeyUp = (e) => {
        submitUsingKey(e.keyCode);
        e.preventDefault();
    };

    // Handles the Click to prevent
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    // Selects an item using the Key Code
    const selectUsingKey = (keyCode) => {
        let handled        = false;
        let newSelectedIdx = 0;

        switch (keyCode) {
        case KeyCode.DOM_VK_UP:
        case KeyCode.DOM_VK_LEFT:
            newSelectedIdx = (selectedIdx - 1) < 0 ? items.length - 1 : selectedIdx - 1;
            handled        = true;
            break;

        case KeyCode.DOM_VK_DOWN:
        case KeyCode.DOM_VK_RIGHT:
            newSelectedIdx = (selectedIdx + 1) % items.length;
            handled        = true;
            break;

        case KeyCode.DOM_VK_HOME:
            newSelectedIdx = 0;
            handled        = true;
            break;
        case KeyCode.DOM_VK_END:
            newSelectedIdx = items.length - 1;
            handled        = true;
            break;

        case KeyCode.DOM_VK_PAGE_UP:
            if (selectedIdx === 0) {
                newSelectedIdx = items.length - 1;
            } else if (selectedIdx - 5 < 0) {
                newSelectedIdx = 0;
            } else {
                newSelectedIdx = selectedIdx - 5;
            }
            handled = true;
            break;
        case KeyCode.DOM_VK_PAGE_DOWN:
            if (selectedIdx === items.length - 1) {
                newSelectedIdx = 0;
            } else if (selectedIdx + 5 >= items.length) {
                newSelectedIdx = items.length - 1;
            } else {
                newSelectedIdx = selectedIdx + 5;
            }
            handled = true;
            break;

        case KeyCode.DOM_VK_ESCAPE:
            onClose();
            break;

        case KeyCode.DOM_VK_RETURN:
            return false;

        default:
        }

        setSelectedIdx(newSelectedIdx);
        scrollToIndex(newSelectedIdx);
        return handled;
    };

    // Submits the selected item using the Key Code
    const submitUsingKey = (keyCode) => {
        if (keyCode === KeyCode.DOM_VK_RETURN && selectedIdx >= 0) {
            setTrigger(true);
        }
    };

    // Scrolls to the Index
    const scrollToIndex = (index) => {
        if (contentRef.current) {
            const elem = contentRef.current.querySelector(`.menu-item-${index}`);
            if (elem) {
                elem.scrollIntoView({
                    behavior : "instant",
                    block    : "nearest",
                });
            }
        }
    };


    // Calculate the Styles
    const [ hasStyles, style, winWidth, forTop ] = React.useMemo(() => {
        let { top, left, right, bottom } = props;
        let hasStyles = (top || bottom) && (left || right);

        const style     = {};
        const dir       = direction || "";
        const forTop    = dir.includes("top");
        const forBottom = dir.includes("bottom");
        const forLeft   = dir.includes("left");
        const winWidth  = window.innerWidth;
        const winHeight = window.innerHeight;

        // Calculate the position based on the Target
        if (!hasStyles && targetRef) {
            const bounds = Utils.getBounds(targetRef);
            if (useBottom) {
                if (forTop) {
                    bottom = winHeight - bounds.top + gap;
                } else if (forBottom) {
                    bottom = winHeight - bounds.bottom - gap;
                }
            } else if (forTop) {
                top = bounds.top - gap;
            } else if (forBottom) {
                top = bounds.bottom + gap;
            } else {
                top = bounds.top;
            }

            if (forTop || forBottom) {
                if (forLeft) {
                    right = winWidth - bounds.right;
                } else {
                    left = bounds.left;
                }
            } else {
                if (forLeft) {
                    right = winWidth - bounds.left;
                } else {
                    left = bounds.right;
                }
            }
            hasStyles = true;
        }

        if (hasStyles) {
            // Adjust for the size of the Menu
            if (top && forTop) {
                top -= boundHeight;
            }
            if (bottom && forBottom) {
                bottom -= boundHeight;
            }
            if (left && forLeft) {
                left -= boundWidth;
            }

            // Adjust using the Container
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

            // Adjust using the Window size
            if (top && top < 0) {
                top = 0;
            } else if (top && boundHeight && top + boundHeight > winHeight) {
                top -= (top + boundHeight) - winHeight;
            }

            if (bottom && bottom < 0) {
                bottom = 0;
            }

            if (left && left < 0) {
                left = 10;
            } else if (left && boundWidth && left + boundWidth > winWidth) {
                left -= (left + boundWidth) - winWidth;
            }

            if (right && boundWidth && right + boundWidth > winWidth) {
                right -= (right + boundWidth) - winWidth;
            }

            // Set the Styles
            if (bottom) {
                style.bottom = `${bottom}px`;
            } else if (top) {
                style.top = `${top}px`;
            }

            if (left) {
                style.left = `${left}px`;
            } else if (right) {
                style.right = `${right}px`;
            }

            if (maxHeight) {
                style.maxHeight = `${maxHeight}px`;
            } else {
                style.maxHeight = `${winHeight - 16}px`;
            }
        }
        return [ hasStyles, style, winWidth, forTop ];
    }, [ open, top, left, right, bottom, boundWidth, boundHeight, iconHeight, gap, width, maxHeight ]);


    // Variables
    const showSearch       = withSearch && (filter || items.length > 5) && winWidth > Responsive.WIDTH_FOR_MOBILE;
    const showTopSearch    = showSearch && !forTop;
    const showBottomSearch = showSearch && forTop;
    const showEmpty        = Boolean((showSearch || filterText) && !items.length && emptyText);
    const showMenu         = Boolean(open && (items.length || showSearch || showEmpty));


    // Do the Render
    if (!showMenu) {
        return <React.Fragment />;
    }

    return <Backdrop
        isSubmenu={isSubmenu}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={handleClose}
    >
        <Container
            ref={contentRef}
            className={`${className} light-scrollbars`}
            withPos={hasStyles}
            isLeft={!hasStyles && variant === Variant.LEFT}
            isRight={!hasStyles && variant === Variant.RIGHT}
            width={width}
            onClick={handleClick}
            style={style}
        >
            {showTopSearch && <Search>
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
            </Search>}

            <Content className="menu-content">
                {items}
                {showEmpty && <Empty>
                    {NLS.get(emptyText)}
                </Empty>}
            </Content>

            {showBottomSearch && <Search atBottom>
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
            </Search>}
        </Container>
    </Backdrop>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Menu.propTypes = {
    open         : PropTypes.bool,
    containerRef : PropTypes.any,
    targetRef    : PropTypes.any,
    variant      : PropTypes.string,
    className    : PropTypes.string,
    direction    : PropTypes.string,
    iconHeight   : PropTypes.number,
    top          : PropTypes.number,
    bottom       : PropTypes.number,
    left         : PropTypes.number,
    right        : PropTypes.number,
    gap          : PropTypes.number,
    width        : PropTypes.number,
    maxHeight    : PropTypes.number,
    useBottom    : PropTypes.bool,
    withSearch   : PropTypes.bool,
    emptyText    : PropTypes.string,
    filterText   : PropTypes.string,
    keyCode      : PropTypes.number,
    onAction     : PropTypes.func,
    onClose      : PropTypes.func.isRequired,
    onMouseEnter : PropTypes.func,
    onMouseLeave : PropTypes.func,
    isSubmenu    : PropTypes.bool,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
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
