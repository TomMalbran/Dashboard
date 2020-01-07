import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import MD5                  from "../../Utils/MD5";

// Components
import HyperLink            from "../Common/HyperLink";



// Styles
const Div = Styled.div.attrs((props) => ({
    size : `${props.size}px`,
}))`
    display: block;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    padding: 2px;
    overflow: hidden;

    &:hover img {
        box-shadow: 0 0 4px var(--lightest-color);
    }
`;

const Img = Styled.img`
    box-sizing: border-box;
    width: 100%;
    border: 2px solid var(--border-color);
    box-shadow: 0 0 4px transparent;
    border-radius: 100%;
    transition: all 0.5s;
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
    const { className, size, url, name, data } = props;

    const avatar  = getAvatar(data);
    const alt     = name || data.name;
    const content = <Div className={className} size={size}>
        <Img alt={alt} src={avatar} />
    </Div>;

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
    size      : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    url       : PropTypes.string,
    data      : PropTypes.object.isRequired,
    name      : PropTypes.string,
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
