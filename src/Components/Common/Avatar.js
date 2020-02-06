import React                from "react";
import PropTypes            from "prop-types";
import { withRouter }       from "react-router";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
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
    overflow: hidden;
`;



/**
 * The Avatar Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Avatar(props) {
    const { history, className, size, url, href, target, name, data, reload } = props;

    const hasClick = Boolean(url || href);

    let avatar = data.avatar;
    if (!avatar && data.email) {
        const username = MD5(data.email.toLowerCase().trim());
        avatar = `https://gravatar.com/avatar/${username}?default=identicon`;
    } else if (reload) {
        avatar += `?rdm=${new Date().getTime()}`;
    }

    // Handles the Click
    const handleClick = (e) => {
        if (hasClick) {
            const uri = url ? NLS.url(url) : href;
            Href.handleUrl(uri, target, history);
            e.stopPropagation();
            e.preventDefault();
        }
    };


    if (!avatar) {
        return <div />;
    }
    return <Div
        className={className}
        size={size}
        hasClick={hasClick}
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
    href      : PropTypes.string,
    target    : PropTypes.string,
    data      : PropTypes.object.isRequired,
    name      : PropTypes.string,
    size      : PropTypes.number,
    reload    : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Avatar.defaultProps = {
    className : "",
    target    : "_self",
    size      : 36,
    reload    : false,
};

export default withRouter(Avatar);
