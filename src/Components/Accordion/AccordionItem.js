import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.section.attrs(({ isFirst, isSelected, isDisabled }) => ({ isFirst, isSelected, isDisabled }))`
    display: flex;
    gap: 8px;
    opacity: 0.7;
    transition: 0.2s all;

    aside {
        opacity: 0.5;
    }

    ${(props) => props.isFirst ? `
        padding-top: 16px;
    ` : `
        padding-top: 32px;
    `}

    ${(props) => props.isSelected && `
        opacity: 1;
        aside {
            opacity: 1;
        }
    `}

    ${(props) => !props.isSelected && !props.isDisabled && `:hover {
        opacity: 1;
        aside {
            opacity: 1;
        }
    }`}
`;

const Aside = Styled.aside`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    width: 48px;
    color: var(--title-color);
    transition: 0.2s all;

    .icon {
        font-size: 14px;
        margin-right: 8px;
    }
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border: 1px solid var(--title-color);
        font-family: var(--title-font);
        border-radius: 100%;
    }
`;

const Inside = Styled.div.attrs(({ isLast }) => ({ isLast }))`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    gap: 24px;
    padding: 0 12px 32px 12px;
    transition: 0.3s all;

    ${(props) => !props.isLast && "border-bottom: 1px solid var(--border-color-light);"}
`;

const Header = Styled.header.attrs(({ isDisabled }) => ({ isDisabled }))`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box; : ""
    width: 100%;
    cursor: pointer;

    ${(props) => props.isDisabled && `
        cursor: not-allowed;
        background-color: white;
    `}
`;

const Div = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Title = Styled.h2`
    margin: 0;
    color: var(--title-color);
    font-family: var(--title-font);
    font-size: 20px;
    font-weight: 800;
`;

const Description = Styled.p`
    margin: 0;
    color: var(--light-color);
`;

const Error = Styled.p`
    margin: 0;
    color: var(--error-text-color);
`;

const Content = Styled.section.attrs(({ isSelected }) => ({ isSelected }))`
    grid-area: content;
    display: ${(props) => props.isSelected ? "block" : "none"};
`;



/**
 * The Accordion Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AccordionItem(props) {
    const {
        className, message, description, error, errorCount, number, icon,
        isFirst, isLast, isSelected, isDisabled, onClick, children,
    } = props;


    // Do the Render
    const errorMessage = error || (Number(errorCount) > 0 ? NLS.pluralize("GENERAL_ERROR_SECTION", errorCount) : "");

    return <Container
        className={className}
        isFirst={isFirst}
        isSelected={isSelected}
        isDisabled={isDisabled}
    >
        <Aside>
            {icon ? <Icon icon={icon} /> : <span>{number}</span>}
        </Aside>
        <Inside isLast={isLast}>
            <Header isDisabled={isDisabled} onClick={onClick}>
                <Div>
                    <Title>{NLS.get(message)}</Title>
                    {!!description && <Description>{NLS.get(description)}</Description>}
                    {!!errorMessage && <Error>{NLS.get(errorMessage)}</Error>}
                </Div>
                {!isDisabled && <Icon icon={isSelected ? "down" : "up"} />}
            </Header>
            <Content isSelected={isSelected}>
                {children}
            </Content>
        </Inside>
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
AccordionItem.propTypes = {
    isHidden    : PropTypes.bool,
    className   : PropTypes.string,
    message     : PropTypes.string.isRequired,
    description : PropTypes.string,
    error       : PropTypes.string,
    errorCount  : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    number      : PropTypes.number,
    icon        : PropTypes.string,
    isFirst     : PropTypes.bool,
    isLast      : PropTypes.bool,
    isSelected  : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    onClick     : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
AccordionItem.defaultProps = {
    isHidden   : false,
    className  : "",
    errorCount : 0,
    isFirst    : false,
    isLast     : false,
    isSelected : false,
    isDisabled : false,
};

export default AccordionItem;
