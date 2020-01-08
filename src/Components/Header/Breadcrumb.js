import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import HyperLink            from "../Common/HyperLink";



// Styles
const Ul = Styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
`;

const Li = Styled.li`
    display: flex;
    align-items: center;
    font-size: 10px;
    text-transform: uppercase;
    margin-right: 4px;
    
    & > a {
        position: relative;
        display: block;
        padding: 0 5px 0 15px;
        height: 16px;
        line-height: 16px;
        color: var(--title-color);
        background: var(--lighter-gray);
        transition: all 0.2s ease-in-out;
    }
    & > a::after,
    & > a::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-style: solid;
        border-width: 8px 0 8px 8px;
        border-color: transparent transparent transparent #fff;
        transition: all 0.2s ease-in-out;
    }
    & > a::after {
        right: -8px;
        left: auto;
        z-index: 1;
        border-left-color: var(--lighter-gray);
    }
    &:first-child > a::before {
        display: none;
    }
    & > a:hover {
        background: var(--dark-gray);
    }
    & > a:hover::after {
        border-left-color: var(--dark-gray);
    }
`;



/**
 * The Breadcrumb Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Breadcrumb(props) {
    const { className, route } = props;

    const parts = route.split("/");
    const items = [{ key : 0, href : "/", message : "GENERAL_START" }];
    const href  = [];

    for (let i = 0; i < parts.length; i++) {
        const message = parts[i];
        href.push(message);
        if (isNaN(message)) {
            items.push({ key : i + 1, href : href.join("/"), message });
        }
    }

    return <Ul className={className}>
        {items.map(({ key, href, message }) => <Li key={key}>
            <HyperLink variant="none" href={href} message={message} />
        </Li>)}
    </Ul>;
}
    
/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Breadcrumb.propTypes = {
    className : PropTypes.string,
    route     : PropTypes.string.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Breadcrumb.defaultProps = {
    className : "",
};

export default Breadcrumb;
