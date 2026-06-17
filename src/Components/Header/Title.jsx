import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.h2`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: var(--title-color);
    font-family: var(--title-font);
    font-weight: var(--title-font-weight);
    font-size: var(--title-font-size);
    line-height: 1.2;
    letter-spacing: var(--title-letter-spacing);
    overflow: hidden;

    @media (max-width: 500px) {
        font-size: 20px;
        line-height: 1;
    }
`;

const TitleEmoji = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    line-height: 1;
    flex-shrink: 0;
`;

const TitleIcon = Styled(Icon)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const Text = Styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;



/**
 * The Title Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Title(props) {
    const { icon, iconColor, emoji, message, fallback, href, backIcon } = props;


    // Variables
    const isLink  = Boolean(href);
    const isEmoji = Boolean(!isLink && emoji);
    const isIcon  = Boolean(!isLink && !isEmoji && icon);


    // Do the Render
    return <Container className="title">
        {isLink && <IconLink
            variant="light"
            icon={backIcon}
            href={href}
            isSmall
        />}
        {isEmoji && <TitleEmoji>
            {emoji}
        </TitleEmoji>}
        {isIcon && <TitleIcon
            icon={icon}
            color={iconColor}
        />}
        <Text>{message ? NLS.get(message) : NLS.get(fallback)}</Text>
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Title.propTypes = {
    icon      : PropTypes.string,
    iconColor : PropTypes.string,
    emoji     : PropTypes.string,
    message   : PropTypes.string,
    fallback  : PropTypes.string,
    href      : PropTypes.string,
    backIcon  : PropTypes.string,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Title.defaultProps = {
    backIcon : "back",
};

export default Title;
