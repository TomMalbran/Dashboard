import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import EmojiPopup           from "../Form/EmojiPopup";
import InputContent         from "../Input/InputContent";



// Styles
const InputValue = Styled.div`
    flex-grow: 2;
    font-size: calc(var(--input-font) * 1.5);
    line-height: calc(var(--input-font) * 1.5);
    white-space: nowrap;
`;



/**
 * The Emoji Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function EmojiInput(props) {
    const {
        className, icon, postIcon, isFocused, isDisabled, isSmall,
        withBorder, withLabel, name, value, onChange, onClear,
    } = props;


    // The References
    const emojiRef = React.useRef(null);

    // The Current State
    const [ showEmojis, setShowEmojis ] = React.useState(false);


    // Handles the Click
    const handleClick = (e) => {
        e.stopPropagation();
        setShowEmojis(!showEmojis);
    };

    // Handles the Emoji Select
    const handleSelect = (emoji) => {
        onChange(name, emoji);
        setShowEmojis(false);
    };


    // Do the Render
    return <InputContent
        passedRef={emojiRef}
        className={className}
        icon={icon}
        postIcon={postIcon}
        isFocused={isFocused}
        isDisabled={isDisabled}
        isSmall={isSmall}
        onClick={handleClick}
        onClear={onClear}
        withBorder={withBorder}
        withLabel={withLabel}
        withPadding
        withClick
    >
        <InputValue>{value}</InputValue>
        <EmojiPopup
            open={showEmojis}
            targetRef={emojiRef}
            direction="bottom right"
            gap={4}
            onClick={handleSelect}
            onClose={() => setShowEmojis(false)}
        />
    </InputContent>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
EmojiInput.propTypes = {
    className  : PropTypes.string,
    icon       : PropTypes.string,
    postIcon   : PropTypes.string,
    isFocused  : PropTypes.bool,
    isDisabled : PropTypes.bool,
    isSmall    : PropTypes.bool,
    withBorder : PropTypes.bool,
    withLabel  : PropTypes.bool,
    name       : PropTypes.string,
    value      : PropTypes.any,
    onChange   : PropTypes.func.isRequired,
    onClear    : PropTypes.func,
    onFocus    : PropTypes.func.isRequired,
    onBlur     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
EmojiInput.defaultProps = {
    className  : "",
    isFocused  : false,
    isDisabled : false,
    isSmall    : false,
    withBorder : true,
    withLabel  : true,
};

export default EmojiInput;
