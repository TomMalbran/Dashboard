import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";
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
    const {
        className, size, name, email, avatar, edition, withReload,
        url, href, target, onClick,
    } = props;

    if (!name && !email) {
        return <React.Fragment />;
    }

    let source = avatar;
    if (!source && email) {
        const username = MD5(email.toLowerCase().trim());
        source = `https://gravatar.com/avatar/${username}?default=identicon`;
    } else if (edition) {
        source += `?rdm=${edition}`;
    } else if (withReload) {
        source += `?rdm=${new Date().getTime()}`;
    }
    if (!source) {
        return <React.Fragment />;
    }

    const hasClick = Boolean(url || href);
    const uri      = url ? NLS.baseUrl(url) : href;
    const navigate = Navigate.useUrl(uri, target);


    // Handles the Click
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        if (hasClick) {
            navigate();
            e.stopPropagation();
            e.preventDefault();
        }
    };


    return <Div
        className={className}
        size={size}
        hasClick={hasClick}
        onClick={handleClick}
    >
        <Img alt={name} src={source} width={size} height={size} />
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Avatar.propTypes = {
    className  : PropTypes.string,
    size       : PropTypes.number,
    name       : PropTypes.string,
    email      : PropTypes.string,
    avatar     : PropTypes.string,
    url        : PropTypes.string,
    href       : PropTypes.string,
    target     : PropTypes.string,
    edition    : PropTypes.number,
    withReload : PropTypes.bool,
    onClick    : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Avatar.defaultProps = {
    className  : "",
    size       : 36,
    target     : "_self",
    withReload : false,
};

export default Avatar;
