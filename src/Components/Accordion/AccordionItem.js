import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Header = Styled.header.attrs(({ isFirst, isSelected, isDisabled }) => ({ isFirst, isSelected, isDisabled }))`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box; : ""
    width: 100%;
    padding: 8px 12px;
    background-color: var(--light-gray);
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    transition: 0.3s all;

    ${(props) => props.isFirst && `
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    `}
    ${(props) => props.isSelected && "box-shadow: inset 0 -3px var(--primary-color)"};
    ${(props) => props.isDisabled && `
        cursor: not-allowed;
        background-color: white;
    `}
    ${(props) => !props.isSelected && !props.isDisabled && `:hover {
        box-shadow: inset 0 -3px var(--primary-color);
    }`}
`;

const H2 = Styled.h2`
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;

    .icon {
        font-size: 14px;
        margin-right: 8px;
    }
`;

const Section = Styled.section.attrs(({ isSelected }) => ({ isSelected }))`
    display: ${(props) => props.isSelected ? "block" : "none"};
    padding: 16px;
`;



/**
 * The Accordion Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AccordionItem(props) {
    const { className, message, icon, isFirst, isSelected, isDisabled, onClick, children } = props;

    return <div className={className} onClick={onClick}>
        <Header
            isFirst={isFirst}
            isSelected={isSelected}
            isDisabled={isDisabled}
        >
            <H2>
                {!!icon && <Icon variant={icon} />}
                {NLS.get(message)}
            </H2>
            {!isDisabled && <Icon variant={isSelected ? "down" : "up"} />}
        </Header>
        <Section isSelected={isSelected}>
            {children}
        </Section>
    </div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
AccordionItem.propTypes = {
    className  : PropTypes.string,
    message    : PropTypes.string.isRequired,
    icon       : PropTypes.string,
    isFirst    : PropTypes.bool,
    isSelected : PropTypes.bool,
    isDisabled : PropTypes.bool,
    onClick    : PropTypes.func,
    children   : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
AccordionItem.defaultProps = {
    className  : "",
    isFirst    : false,
    isSelected : false,
    isDisabled : false,
};

export default AccordionItem;
