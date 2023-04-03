import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

//  Utils
import Utils                from "../../Utils/Utils";

// Components
import CircularLoader       from "../Loader/CircularLoader";
import FilterList           from "../Filter/FilterList";
import Filter               from "../Filter/Filter";
import StatList             from "../Stats/StatList";
import TabList              from "../Tab/TabList";



// Styles
const Section = Styled.section.attrs(({ withDetails }) => ({ withDetails }))`
    flex-grow: 1;
    padding: 0 var(--main-padding) var(--main-padding);
    overflow: auto;

    ${(props) => props.withDetails && `
        display: grid;
        grid-template-columns: 1fr var(--details-width);
        gap: 16px;
    `}
`;



/**
 * The Content Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Content(props) {
    const { className, isLoading, passedRef, withDetails, children } = props;

    if (isLoading) {
        return <Section className={className} ref={passedRef}>
            <CircularLoader top={40} />
        </Section>;
    }

    const items       = [];
    let   hasFilter   = false;
    let   statsAmount = 0;
    let   hasTabs     = false;

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

    return <Section className={className} ref={passedRef} withDetails={withDetails}>
        {items}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Content.propTypes = {
    className   : PropTypes.string,
    isLoading   : PropTypes.bool,
    passedRef   : PropTypes.any,
    withDetails : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Content.defaultProps = {
    className   : "",
    isLoading   : false,
    withDetails : false,
};

export default Content;
