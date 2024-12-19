import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Title                from "../Header/Title";
import Subtitle             from "../Header/Subtitle";



// Styles
const Container = Styled.header`
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
    padding: var(--header-padding);
    gap: var(--main-padding);
`;

const Child = Styled.div`
    flex-grow: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;

    .tab-item {
        margin-bottom: 0;
    }
`;



/**
 * The Header Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Header(props) {
    const {
        className, icon, message, fallback, href,
        subTitle, subCircle, children,
    } = props;


    // Do the Render
    return <Container className={className}>
        <Title
            icon={icon}
            message={message}
            fallback={fallback}
            href={href}
        />
        <Subtitle
            message={subTitle}
            circle={subCircle}
        />
        <Child>
            {children}
        </Child>
    </Container>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Header.propTypes = {
    className : PropTypes.string,
    icon      : PropTypes.string.isRequired,
    message   : PropTypes.string.isRequired,
    fallback  : PropTypes.string,
    href      : PropTypes.string,
    subTitle  : PropTypes.string,
    subCircle : PropTypes.string,
    children  : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Header.defaultProps = {
    className : "",
};

export default Header;
