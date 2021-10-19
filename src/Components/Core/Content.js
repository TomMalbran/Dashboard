import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

//  Utils
import Utils                from "../../Utils/Utils";

// Components
import CircularLoader       from "../Loader/CircularLoader";
import Alert                from "../Form/Alert";
import StatList             from "../Stats/StatList";
import TabList              from "../Tab/TabList";
import Table                from "../Table/Table";



// Styles
const Section = Styled.section`
    flex-grow: 1;
    padding: 0 24px 24px;
    overflow: auto;
`;



/**
 * The Content Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Content(props) {
    const { className, isLoading, passedRef, alert, children } = props;

    if (isLoading) {
        return <Section className={className} ref={passedRef}>
            <CircularLoader top={40} />
        </Section>;
    }

    const items    = [];
    let   hasStats = false;
    let   hasTabs  = false;
    let   hasAlert = false;

    for (const [ , child ] of Utils.getVisibleChildren(children)) {
        if (child.type === StatList) {
            hasStats = true;
        } else if (child.type === Alert || child.type === alert) {
            hasAlert = true;
        } else if (child.type === TabList) {
            hasTabs = true;
        }
    }
    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        if (typeof child.type !== "string") {
            items.push(React.cloneElement(child, { key, hasStats, hasAlert, hasTabs }));
        } else {
            items.push(React.cloneElement(child, { key }));
        }
    }

    return <Section className={className} ref={passedRef}>
        {items}
    </Section>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
Content.propTypes = {
    className : PropTypes.string,
    isLoading : PropTypes.bool,
    passedRef : PropTypes.any,
    alert     : PropTypes.any,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Content.defaultProps = {
    className : "",
    isLoading : false,
};

export default Content;
