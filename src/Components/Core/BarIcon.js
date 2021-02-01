import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import { Brightness }       from "../../Core/Variants";
import Icon                 from "../Common/Icon";



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

    ${(props) => props.variant === Brightness.DARK && `
        --bicon-color: white;
        --bicon-background: var(--primary-color);
        --bicon-hover: var(--secondary-color);
    `}
    ${(props) => props.variant === Brightness.LIGHT && `
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
    const { isHidden, className, variant, icon, onClick } = props;

    if (isHidden) {
        return <React.Fragment />;
    }
    return <Div className={className} variant={variant} onClick={onClick}>
        <Icon icon={icon} />
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
BarIcon.propTypes = {
    isHidden  : PropTypes.bool,
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
    isHidden  : false,
    className : "",
    variant   : Brightness.LIGHT,
};

export default BarIcon;
