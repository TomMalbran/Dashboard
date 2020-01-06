import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Div = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    width: 32px;
    height: 32px;
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.5s;
`;

const DarkIcon = Styled(Div)`
    color: white;
    background-color: var(--primary-color);
    &:hover {
        background-color: var(--secondary-color);
    }
`;

const LightIcon = Styled(Div)`
    color: var(--primary-color);
    background-color: rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: white;
    }
`;



/**
 * The Bar Icon Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarIcon(props) {
    const { variant, className, icon, onClick } = props;
    const Component = variant === "dark" ? DarkIcon : LightIcon;

    return <Component className={className}>
        <Icon
            variant={icon}
            onClick={onClick}
        />
    </Component>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarIcon.propTypes = {
    className : PropTypes.string,
    variant   : PropTypes.string,
    icon      : PropTypes.string.isRequired,
    onClick   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
BarIcon.defaultProps = {
    className : "",
    variant   : "light",
};

export default BarIcon;
