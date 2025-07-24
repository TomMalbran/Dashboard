import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import IconLink             from "../Link/IconLink";



// Styles
const Container = Styled.section.attrs(({ inDialog, inDetails, lineWidth, lineLeft }) => ({ inDialog, inDetails, lineWidth, lineLeft }))`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: var(--border-width) solid var(--border-color-light);

    &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 3px;
        width: ${(props) => props.lineWidth}px;
        translate: ${(props) => props.lineLeft}px;
        background-color: var(--tab-selected-line-color, var(--primary-color));
        transition: all 0.2s ease-in-out;
    }

    ${(props) => (!props.inDialog && !props.inDetails) && `
        margin-bottom: var(--main-gap);
    `}

    ${(props) => props.inDialog && `
        position: sticky;
        top: 0;
        background-color: var(--content-color);
        z-index: 4;
    `};

    ${(props) => props.inDetails && `
        position: sticky;
        top: 0;
        padding-top: var(--details-spacing);
        background-color: var(--content-color);
        z-index: 3;
    `}
`;

const Content = Styled.div.attrs(({ size }) => ({ size }))`
    display: flex;
    max-width: 100%;
    overflow: auto;
    display: flex;

    ${(props) => props.size > 0 && `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${props.size || 100}px, 1fr));
    `}
`;

const TabLink = Styled(IconLink)`
    margin-left: 8px;
    .icon {
        font-size: 20px;
    }
`;



/**
 * The Tab List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function TabList(props) {
    const {
        isHidden, className, size, selected,
        onClick, onAction, inDialog, inDetails,
        canAdd, addVariant, children,
    } = props;

    const contentRef = React.useRef(null);

    // The Current State
    const [ lineWidth, setLineWidth ] = React.useState(0);
    const [ lineLeft,  setLineLeft  ] = React.useState(0);


    // Clone the Children
    const items = Utils.cloneChildren(children, (child, index) => ({
        index, onClick, onAction, selected, inDialog,
    }));


    // Listens for the Selection
    React.useEffect(() => {
        handleSelection(selected);
    }, [ contentRef.current, selected, items.length ]);

    // Handles the Selection
    const handleSelection = (selected) => {
        const item = contentRef.current?.querySelector(`.tab-item-${selected}`);
        if (!item) {
            window.setTimeout(() => handleSelection(selected), 500);
        } else {
            setSelection(item);
        }
    };

    // Sets the Selection
    const setSelection = (item) => {
        const itemBounds    = item.getBoundingClientRect();
        const contentBounds = contentRef.current.getBoundingClientRect();

        setLineLeft(itemBounds.left - contentBounds.left);
        setLineWidth(itemBounds.width);
    };


    // Do the Render
    const showAdd = Boolean(canAdd && onAction);

    if (isHidden) {
        return <React.Fragment />;
    }
    return <Container
        ref={contentRef}
        className={`tabs ${className}`}
        inDialog={inDialog}
        inDetails={inDetails}
        lineWidth={lineWidth}
        lineLeft={lineLeft}
    >
        <Content className="tabs-content no-scrollbars" size={size}>
            {items}
        </Content>
        {showAdd && <TabLink
            variant={addVariant}
            icon="add"
            onClick={() => onAction(Action.get("ADD"))}
        />}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
TabList.propTypes = {
    isHidden   : PropTypes.bool,
    className  : PropTypes.string,
    selected   : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    onClick    : PropTypes.func,
    onAction   : PropTypes.func,
    inDialog   : PropTypes.bool,
    inDetails  : PropTypes.bool,
    canAdd     : PropTypes.bool,
    addVariant : PropTypes.string,
    size       : PropTypes.number,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
TabList.defaultProps = {
    isHidden   : false,
    className  : "",
    size       :  0,
    inDialog   : false,
    inDetails  : false,
    canAdd     : false,
    addVariant : Brightness.LIGHT,
};

export default TabList;
