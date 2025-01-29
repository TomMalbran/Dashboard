import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const props = ({
    isFocused, isDisabled, isSmall,
    withBorder, withPadding, withLabel, withClick,
}) => ({
    isFocused, isDisabled, isSmall,
    withBorder, withPadding, withLabel, withClick,
});

const Container = Styled.div.attrs(props)`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    color: var(--font-color);

    ${(props) => props.withBorder && `
        background-color: var(--content-color);
        min-height: var(--input-height);
        border: 1px solid var(--input-border);
        border-radius: var(--border-radius);
    `}
    ${(props) => (props.withBorder && props.withPadding) && `
        padding: var(--input-padding);
    `}
    ${(props) => (props.withBorder && props.withLabel) && `
        padding-top: var(--input-label) !important;
    `}
    ${(props) => (props.withClick && !props.isDisabled) && `
        cursor: pointer;
    `}
    ${(props) => (props.withBorder && !props.withLabel && props.isSmall) && `
        min-height: calc(var(--input-height) - var(--input-label));
    `}

    ${(props) => (props.withBorder && props.isFocused) && `
        --input-border: var(--input-border-focus);
        box-shadow: 0 0 0 1px var(--input-border-focus);
        .inputfield {
            --input-border: var(--input-border-focus);
        }
    `}

    ${(props) => props.isDisabled && `
        color: var(--input-disabled-color);
    `}
    ${(props) => (props.withBorder && props.isDisabled) && `
        --input-border: var(--input-border-disabled);
    `}
    ${(props) => (props.withBorder && !props.isDisabled) && `
        &:hover, &:hover .inputfield {
            --input-border: var(--input-border-hover);
        }
    `}
`;

const InputIcon = Styled(Icon)`
    flex-shrink: 0;
    font-size: 16px;
    margin-left: -4px;
    color: var(--black-color);
`;

const PostInputIcon = Styled(Icon)`
    flex-shrink: 0;
    font-size: 16px;
    margin-top: -4px;
    margin-right: -6px;
    color: var(--black-color);
`;

const Text = Styled.p`
    margin: 0;
    font-size: 12px;
    color: var(--font-lighter);
`;

const InputClear = Styled(IconLink).attrs(({ smallInput }) => ({ smallInput }))`
    margin-top: -4px;
    margin-right: calc(2px - var(--input-horiz-padding));
    ${(props) => props.smallInput && "margin-bottom: -4px;"}
`;



/**
 * The Input Content Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function InputContent(props) {
    const {
        passedRef, inputRef, className,
        isFocused, isDisabled, isSmall,
        withBorder, withPadding, withLabel, withClick,
        onClick, onClear, icon, postIcon, prefixText, children,
    } = props;


    // Handles the Click
    const handleClick = (e) => {
        if (isDisabled) {
            return;
        }
        if (onClick) {
            onClick(e);
        } else if (inputRef && inputRef.current) {
            inputRef.current.click();
            inputRef.current.focus();
        }
    };


    // Do the Render
    const hasClear = Boolean(!isDisabled && onClear);

    return <Container
        ref={passedRef}
        className={`input-content ${className}`}
        isFocused={isFocused}
        isDisabled={isDisabled}
        isSmall={isSmall}
        withBorder={withBorder}
        withPadding={withPadding}
        withLabel={withLabel}
        withClick={withClick}
        onClick={handleClick}
    >
        {!!icon && <InputIcon icon={icon} />}
        {!!prefixText && <Text>{NLS.get(prefixText)}</Text>}
        {children}
        {!!postIcon && <PostInputIcon icon={postIcon} />}
        {hasClear && <InputClear
            variant="black"
            icon="close"
            onClick={onClear}
            smallInput={isSmall}
            isSmall
        />}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
InputContent.propTypes = {
    passedRef   : PropTypes.any,
    inputRef    : PropTypes.any,
    className   : PropTypes.string,
    isFocused   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    isSmall     : PropTypes.bool,
    withBorder  : PropTypes.bool,
    withPadding : PropTypes.bool,
    withLabel   : PropTypes.bool,
    withClick   : PropTypes.bool,
    onClick     : PropTypes.func,
    onClear     : PropTypes.func,
    icon        : PropTypes.string,
    postIcon    : PropTypes.string,
    prefixText  : PropTypes.string,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
InputContent.defaultProps = {
    className   : "",
    isFocused   : false,
    isDisabled  : false,
    isSmall     : false,
    withBorder  : false,
    withPadding : false,
    withLabel   : false,
    withClick   : false,
};

export default InputContent;
