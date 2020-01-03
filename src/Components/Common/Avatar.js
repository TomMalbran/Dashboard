import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import MD5                  from "../../Utils/MD5";

// Components
import HyperLink            from "./HyperLink";



// Styles
const AvatarContent = Styled.div`
    display: block;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    padding: 2px;
    overflow: hidden;

    & img {
        box-sizing: border-box;
        max-width: 100%;
        max-height: 100%;
        border: 2px solid var(--border-color);
        box-shadow: 0 0 4px transparent;
        border-radius: 100%;
        transition: all 0.5s;
    }
    &:hover img {
        box-shadow: 0 0 4px var(--lightest-color);
    }
`;



/**
 * Returns the Avatar for the given data
 * @param {Object} data
 * @returns {String}
 */
function getAvatar(data) {
    if (data.avatar) {
        return data.avatar;
    }
    if (data.email) {
        const avatar = MD5(data.email.toLowerCase().trim());
        return `https://gravatar.com/avatar/${avatar}?default=identicon`;
    }
    return "";
}



/**
 * The Avatar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Avatar(props) {
    const { className, size, url, alt, data } = props;

    const avatar  = getAvatar(data);
    const content = <AvatarContent className={className} size={size}>
        <img alt={alt} src={avatar} />
    </AvatarContent>;

    if (url) {
        return <HyperLink variant="none" url={url}>
            {content}
        </HyperLink>;
    }
    return content;
}
    
/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Avatar.propTypes = {
    className : PropTypes.string,
    size      : PropTypes.string,
    url       : PropTypes.string,
    alt       : PropTypes.string.isRequired,
    data      : PropTypes.object.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Avatar.defaultProps = {
    className : "",
    size      : "36",
};

export default Avatar;
