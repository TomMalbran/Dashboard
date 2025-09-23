import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Responsive           from "../../Core/Responsive";
import Utils                from "../../Utils/Utils";

// Components
import CircularLoader       from "../Loader/CircularLoader";
import FilterList           from "../Filter/FilterList";
import Filter               from "../Filter/Filter";
import StatList             from "../Stats/StatList";
import TabList              from "../Tab/TabList";



// Styles
const Section = Styled.section.attrs(({ withDetails, wideDetails, hasTabs }) => ({ withDetails, wideDetails, hasTabs }))`
    flex-grow: 1;
    padding: 0 var(--main-padding) var(--main-padding);
    overflow: auto;

    ${(props) => props.withDetails && `
        display: grid;
        grid-template-columns: minmax(0, 1fr) var(--details-width${props.wideDetails ? "-wide" : ""});
        column-gap: 16px;
    `};

    ${(props) => (props.withDetails && props.hasTabs) && `
        grid-template-rows: var(--tabs-table) 1fr;
        .details {
            grid-column: 2 / 2;
            grid-row: 1 / 3;
        }
    `};

    ::-webkit-scrollbar:vertical {
        border-left: none !important;
    }
    ::-webkit-scrollbar:horizontal {
        border-top: none !important;
    }

    @media (max-width: ${Responsive.WIDTH_FOR_DETAILS}px) {
        display: block;
    }
`;



/**
 * The Content Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Content(props) {
    const {
        className, isLoading, passedRef,
        withTabs, withDetails, wideDetails, children,
    } = props;


    // Render the Loading
    if (isLoading) {
        return <Section className={className} ref={passedRef}>
            <CircularLoader top={40} />
        </Section>;
    }


    // Calculate the Items
    const items       = [];
    let   hasFilter   = false;
    let   statsAmount = 0;
    let   hasTabs     = withTabs;

    for (const [ , child ] of Utils.getVisibleChildren(children)) {
        if (child.type === FilterList || child.type === Filter) {
            hasFilter = true;
        } else if (child.type === StatList) {
            statsAmount += 1;
        } else if (child.type === TabList) {
            hasTabs = true;
        }
    }
    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        if (typeof child.type !== "string") {
            items.push(React.cloneElement(child, { key, hasFilter, statsAmount, hasTabs }));
        } else {
            items.push(React.cloneElement(child, { key }));
        }
    }


    // Do the Render
    return <Section
        ref={passedRef}
        className={className}
        withDetails={withDetails}
        wideDetails={wideDetails}
        hasTabs={hasTabs}
    >
        {items}
    </Section>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Content.propTypes = {
    className   : PropTypes.string,
    isLoading   : PropTypes.bool,
    passedRef   : PropTypes.any,
    withTabs    : PropTypes.bool,
    withDetails : PropTypes.bool,
    wideDetails : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Content.defaultProps = {
    className   : "",
    isLoading   : false,
    withTabs    : false,
    withDetails : false,
};

export default Content;
