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
 * The Avatar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Avatar(props) {
    const { className, size, url, name, data } = props;

    let avatar = data.avatar;
    if (!avatar && data.email) {
        const username = MD5(data.email.toLowerCase().trim());
        avatar = `https://gravatar.com/avatar/${username}?default=identicon`;
    }
    if (!avatar) {
        return <React.Component />;
    }

    const content = <Div className={className} size={size}>
        <Img alt={name || data.name} src={avatar} />
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
    url       : PropTypes.string,
    data      : PropTypes.object.isRequired,
    name      : PropTypes.string,
    size      : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Avatar.defaultProps = {
    className : "",
    size      : 36,
};

export default Avatar;
