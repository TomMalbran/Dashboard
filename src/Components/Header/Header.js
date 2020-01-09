import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Breadcrumb           from "../Header/Breadcrumb";
import Title                from "../Header/Title";



// Styles
const Container = Styled.header`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    height: var(--header-height);
    padding: 8px 24px 8px 24px;
    flex-shrink: 0;
    background-color: white;
`;

const Div = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;



/**
 * The Header Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Header(props) {
    const { className, icon, message, fallback, route, children } = props;
    
    return <Container className={className}>
        {!!route && <Breadcrumb route={route} />}
        <Div>
            <Title
                icon={icon}
                message={message}
                fallback={fallback}
            />
            {children}
        </Div>
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
    route     : PropTypes.string,
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
