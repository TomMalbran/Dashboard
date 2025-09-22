import React                 from "react";
import PropTypes             from "prop-types";
import Styled, { keyframes } from "styled-components";

// Core & Utils
import NLS                   from "../../Core/NLS";
import Utils                 from "../../Utils/Utils";

// Components
import InputContent          from "../Input/InputContent";
import Html                  from "../Common/Html";
import Icon                  from "../Common/Icon";



// Animations
const tick = keyframes`
    from { transform: scale(0); }
    to   { transform: scale(1); }
`;

// Styles
const Container = Styled.label`
    --radio-outer: var(--input-radio-outer, 20px);
    --radio-inner: var(--input-radio-inner, 12px);

    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
`;

const Radio = Styled.input`
    flex-shrink: 0;
    width: var(--radio-outer);
    height: var(--radio-outer);
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    opacity: 0;

    &:focus + span {
        border-color: var(--border-color-dark);
        outline: none;
    }

    &:checked + span {
        border-color: var(--input-radio-normal);
    }
    &:checked + span::before {
        content: "";
        display: block;
        position: absolute;
        top: calc(50% - var(--radio-inner) / 2);
        left: calc(50% - var(--radio-inner) / 2);
        width: var(--radio-inner);
        height: var(--radio-inner);
        border-radius: 50%;
        border-color: var(--border-color-dark);
        background-color: var(--input-radio-normal);
        animation: ${tick} 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275);
    }

    &:disabled + span {
        background-color: rgb(245, 245, 245);
        color: rgb(175, 175, 175);
        cursor: not-allowed;
    }
    &:disabled:checked + span {
        border-color: var(--input-radio-disabled);
    }
    &:disabled:checked + span::before {
        background-color: var(--input-radio-disabled);
    }
`;

const Span = Styled.span`
    flex-shrink: 0;
    position: relative;
    box-sizing: border-box;
    display: block;
    height: var(--radio-outer);
    width: var(--radio-outer);
    margin: 0 8px 0 calc(0px - var(--radio-outer));
    border: 2px solid var(--border-color-light);
    border-radius: 50%;
    transition: all 0.2s;
`;

const Content = Styled.div.attrs(({ hasChildren }) => ({ hasChildren }))`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 6px;
    font-size: var(--input-font);

    ${(props) => props.hasChildren && `
        padding: 8px 0 8px 4px;
    `}
`;

const Title = Styled.div`
    display: flex;
    gap: 4px;

    .icon {
        font-size: 16px;
        color: var(--primary-color);
    }
`;

const Label = Styled(Html).attrs(({ hasChildren }) => ({ hasChildren }))`
    font-size: var(--input-font);
    color: var(--input-check-normal, black);
    ${(props) => props.hasChildren && "font-weight: bold;"}
`;



/**
 * The Radiobox Input Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function RadioboxInput(props) {
    const {
        inputRef, className, isFocused, isDisabled,
        withBorder, dashedBorder,
        id, name, value, icon, label, isChecked,
        onChange, onClick, onFocus, onBlur, children,
    } = props;

    // Handles the Change
    const handleChange = () => {
        onChange(name, value);
    };

    // Handles the Click
    const handleClick = (e) => {
        if (withBorder) {
            Utils.triggerClick(inputRef);
            e.preventDefault();
            e.stopPropagation();
        }
        if (onClick) {
            onClick(e);
        }
    };


    // Do the Render
    const hasChildren = Boolean(children);

    return <InputContent
        className={className}
        isFocused={isFocused}
        isDisabled={isDisabled}
        withBorder={withBorder}
        dashedBorder={dashedBorder}
        onClick={handleClick}
        withClick={withBorder}
        withPadding
    >
        <Container>
            <Radio
                ref={inputRef}
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <Span />

            <Content hasChildren={hasChildren}>
                {!!label && <Title>
                    {!!icon && <Icon icon={icon} size="16" />}
                    <Label variant="span" hasChildren={hasChildren}>
                        {NLS.get(label)}
                    </Label>
                </Title>}
                {children}
            </Content>
        </Container>
    </InputContent>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
RadioboxInput.propTypes = {
    inputRef     : PropTypes.any,
    className    : PropTypes.string,
    isFocused    : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    withBorder   : PropTypes.bool,
    dashedBorder : PropTypes.bool,
    id           : PropTypes.string,
    name         : PropTypes.string.isRequired,
    value        : PropTypes.any,
    icon         : PropTypes.string,
    label        : PropTypes.string,
    isChecked    : PropTypes.bool,
    onChange     : PropTypes.func.isRequired,
    onClick      : PropTypes.func,
    onFocus      : PropTypes.func,
    onBlur       : PropTypes.func,
    children     : PropTypes.any,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
RadioboxInput.defaultProps = {
    className    : "",
    isFocused    : false,
    isDisabled   : false,
    withBorder   : false,
    dashedBorder : false,
    isChecked    : false,
};

export default RadioboxInput;
