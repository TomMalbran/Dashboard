import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Icon                 from "../Common/Icon";

// Variants
const Variant = {
    DARK  : "dark",
    LIGHT : "light",
};



// Styles
const Div = Styled.div.attrs(({ variant }) => ({ variant }))`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    width: 32px;
    height: 32px;
    color: var(--bicon-color);
    background-color: var(--bicon-background);
    border-radius: var(--border-radius);
    font-size: 16px;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background-color: var(--bicon-hover);
    }

    ${(props) => props.variant === Variant.DARK && `
        --bicon-color: white;
        --bicon-background: var(--primary-color);
        --bicon-hover: var(--secondary-color);
    `}
    ${(props) => props.variant === Variant.LIGHT && `
        --bicon-color: var(--primary-color);
        --bicon-background: rgba(0, 0, 0, 0.1);
        --bicon-hover: white;
    `}
`;



/**
 * The Bar Icon Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function BarIcon(props) {
    const { variant, className, icon, onClick } = props;

    return <Div className={className} variant={variant}>
        <Icon
            icon={icon}
            onClick={onClick}
        />
    </Div>;
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
    variant   : Variant.LIGHT,
};

export default BarIcon;
