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



// Constants
const POPUP_HEIGHT = 400;
const TEST_HEIGHT  = 410;
const POPUP_WIDTH  = 350;
const TEST_WIDTH   = 360;

// Styles
const Emoji = Styled.div.attrs(({ top, left }) => ({ top, left }))`
    position: absolute;
    top: ${(props) => `${props.top}px`};
    left: ${(props) => `${props.left}px`};
    z-index: var(--z-menu);

    aside {
        --epr-picker-border-color: white;
        --epr-picker-border-radius: var(--border-radius);
        --epr-category-label-bg-color: var(--lighter-gray);
        --epr-search-input-bg-color: var(--lighter-gray);
        --epr-category-label-bg-color: var(--lighter-gray);
        --epr-category-label-text-color: var(--title-color);
        --epr-emoji-hover-color: var(--dark-gray);
        --epr-search-border-color: var(--primary-color);
        --epr-highlight-color: var(--primary-color);
        --epr-header-padding: 8px;

        box-sizing: border-box;
        box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px;
        /* background-color: var(--lighter-gray); */
    }
    .EmojiPickerReact ul.epr-emoji-list {
        padding: 0 8px;
    }
    .EmojiPickerReact li.epr-emoji-category>.epr-emoji-category-label {
        border-radius: var(--border-radius);
    }
`;


/**
 * The Emoji Popup
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function EmojiPopup(props) {
    const {
        open, targetRef, direction, gap,
        top, bottom, left, right,
        onClick, onClose,
    } = props;

    const contentRef = React.useRef(null);


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
        if (open && !Utils.inRef(e.clientX, e.clientY, contentRef)) {
            onClose();
        }
    };


    // Return early
    if (!open) {
        return <React.Fragment />;
    }


    // Set the position
    let posTop  = top  || 0;
    let posLeft = left || 0;

    if (targetRef) {
        const bounds = Utils.getBounds(targetRef);
        if (direction.includes("top")) {
            posTop = bounds.top - gap;
        } else {
            posTop = bounds.bottom + gap;
        }
        if (posTop && direction.includes("left")) {
            posLeft = bounds.right - POPUP_WIDTH;
        } else {
            posLeft = bounds.left;
        }
    } else {
        if (bottom) {
            posTop = bottom - POPUP_HEIGHT;
        }
        if (right) {
            posLeft = right - POPUP_WIDTH;
        }
    }

    if (posTop + TEST_HEIGHT > window.innerHeight) {
        posTop -= (posTop + TEST_HEIGHT) - window.innerHeight;
    }
    if (posLeft + TEST_WIDTH > window.innerWidth) {
        posLeft -= (posLeft + TEST_WIDTH) - window.innerWidth;
    }


    // Do the Render
    if (!open) {
        return <React.Fragment />;
    }
    return <Emoji ref={contentRef} top={posTop} left={posLeft}>
        <EmojiPicker
            onEmojiClick={(elem) => onClick(elem.emoji)}
            emojiStyle={EmojiStyle.NATIVE}
            previewConfig={{ showPreview : false }}
            skinTonesDisabled={true}
            searchPlaceHolder={NLS.get("GENERAL_SEARCH")}
            height={POPUP_HEIGHT}
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
    open      : PropTypes.bool,
    targetRef : PropTypes.any,
    direction : PropTypes.string,
    top       : PropTypes.number,
    bottom    : PropTypes.number,
    left      : PropTypes.number,
    right     : PropTypes.number,
    gap       : PropTypes.number,
    onClick   : PropTypes.func.isRequired,
    onClose   : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
EmojiPopup.defaultProps = {
    open      : false,
    direction : "",
    top       : 0,
    left      : 0,
    gap       : 0,
};

export default EmojiPopup;
