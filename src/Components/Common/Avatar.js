import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Utils
import Href                 from "../../Utils/Href";
import MD5                  from "../../Utils/MD5";



// Styles
const Div = Styled.div.attrs(({ size, hasClick }) => ({ size, hasClick }))`
    display: block;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    padding: 2px;
    overflow: hidden;
    ${(props) => props.hasClick && "cursor: pointer;"}
    
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
    const { history, className, size, url, target, name, data } = props;

    let avatar = data.avatar;
    if (!avatar && data.email) {
        const username = MD5(data.email.toLowerCase().trim());
        avatar = `https://gravatar.com/avatar/${username}?default=identicon`;
    }

    // Handles the Click
    const handleClick = (e) => {
        if (url) {
            Href.handleUrl(url, target, history);
            e.stopPropagation();
            e.preventDefault();
        }
    };


    if (!avatar) {
        return <React.Component />;
    }
    return <Div
        className={className}
        size={size}
        hasClick={!!url}
        onClick={handleClick}
    >
        <Img alt={name || data.name} src={avatar} />
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Avatar.propTypes = {
    history   : PropTypes.object.isRequired,
    className : PropTypes.string,
    url       : PropTypes.string,
    target    : PropTypes.string,
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
    target    : "_self",
    size      : 36,
};

export default withRouter(Avatar);
