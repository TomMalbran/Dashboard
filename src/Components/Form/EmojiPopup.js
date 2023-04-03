import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";

// Emoji
import EmojiPicker, {
    EmojiStyle, Categories,
} from "emoji-picker-react";



// Styles
const Emoji = Styled.div.attrs(({ top, left }) => ({ top, left }))`
    position: absolute;
    top: ${(props) => `${props.top}px`};
    left: ${(props) => `${props.left}px`};
    z-index: var(--z-menu);

    aside {
        --epr-picker-border-color: var(--lighter-gray);
        --epr-picker-border-radius: var(--border-radius);
        --epr-category-label-bg-color: var(--lighter-gray);
        --epr-search-input-bg-color: var(--light-gray);
        --epr-emoji-hover-color: var(--dark-gray);
        --epr-search-border-color: var(--primary-color);
        --epr-highlight-color: var(--primary-color);
        box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px;
        background-color: var(--lighter-gray);
    }
`;


/**
 * The Emoji Popup
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function EmojiPopup(props) {
    const { open, top, left, right, onClick, onClose } = props;

    const menuRef = React.useRef(null);


    // Handle the Close
    React.useEffect(() => {
        if (open) {
            window.addEventListener("click", handleClose);
            return () => window.removeEventListener("click", handleClose);
        }
        return () => {};
    }, [ open ]);

    // Handle the Emoji Close
    const handleClose = (e) => {
        if (open && !Utils.inRef(e.clientX, e.clientY, menuRef)) {
            onClose();
        }
    };


    // Do the Render
    if (!open) {
        return <React.Fragment />;
    }

    const posTop  = Math.max(60, top - 400);
    let   posLeft = left;
    if (right) {
        posLeft = right - 350;
    }
    if (posLeft + 360 > window.innerWidth) {
        posLeft -= (posLeft + 360) - window.innerWidth;
    }

    return <Emoji ref={menuRef} top={posTop} left={posLeft}>
        <EmojiPicker
            onEmojiClick={(elem) => onClick(elem.emoji)}
            emojiStyle={EmojiStyle.NATIVE}
            previewConfig={{ showPreview : false }}
            skinTonesDisabled={true}
            searchPlaceHolder={NLS.get("GENERAL_SEARCH")}
            height={400}
            categories={[
                {
                    category : Categories.SUGGESTED,
                    name     : NLS.get("EMOJI_SUGGESTED"),
                },
                {
                    category : Categories.SMILEYS_PEOPLE,
                    name     : NLS.get("EMOJI_SMILEYS"),
                },
                {
                    category : Categories.ANIMALS_NATURE,
                    name     : NLS.get("EMOJI_ANIMALS"),
                },
                {
                    category : Categories.FOOD_DRINK,
                    name     : NLS.get("EMOJI_FOOD"),
                },
                {
                    category : Categories.TRAVEL_PLACES,
                    name     : NLS.get("EMOJI_TRAVEL"),
                },
                {
                    category : Categories.ACTIVITIES,
                    name     : NLS.get("EMOJI_ACTIVITIES"),
                },
                {
                    category : Categories.OBJECTS,
                    name     : NLS.get("EMOJI_OBJECTS"),
                },
                {
                    category : Categories.SYMBOLS,
                    name     : NLS.get("EMOJI_SYMBOLS"),
                },
                {
                    category : Categories.FLAGS,
                    name     : NLS.get("EMOJI_FLAGS"),
                },
            ]}
        />
    </Emoji>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
EmojiPopup.propTypes = {
    open    : PropTypes.bool.isRequired,
    top     : PropTypes.number.isRequired,
    left    : PropTypes.number,
    right   : PropTypes.number,
    onClick : PropTypes.func.isRequired,
    onClose : PropTypes.func.isRequired,
};

export default EmojiPopup;
