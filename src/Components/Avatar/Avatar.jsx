import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import Navigate             from "../../Core/Navigate";
import NLS                  from "../../Core/NLS";
import Utils                from "../../Utils/Utils";



// Styles
const Container = Styled.div.attrs(({ size, hasClick }) => ({ size, hasClick }))`
    box-sizing: border-box;
    display: block;
    flex-shrink: 0;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    border: 2px solid black;
    box-shadow: 0 0 4px transparent;
    border-radius: 100%;
    transition: all 0.5s;
    overflow: hidden;
    ${(props) => props.hasClick && "cursor: pointer;"}

    &:hover {
        box-shadow: 0 0 4px black;
    }
`;

const Image = Styled.img`
    display: block;
    box-sizing: border-box;
    width: 100%;
`;



/**
 * The Avatar Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Avatar(props) {
    const {
        passedRef, className, size, name, email, avatar, edition, withReload,
        url, href, target, onClick, defaultValue,
    } = props;

    const hasClick = Boolean(url || href || onClick);
    const uri      = url ? NLS.baseUrl(url) : href;
    const navigate = Navigate.useGotoUrl();


    // Handles the Click
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        if (hasClick) {
            navigate(uri, target);
            e.stopPropagation();
            e.preventDefault();
        }
    };


    // Calculate the Source
    const source = React.useMemo(() => {
        let source = avatar;
        if (!source) {
            source = Utils.getGravatarUrl(email, defaultValue);
        } else if (edition) {
            source += `?rdm=${edition}`;
        } else if (withReload) {
            source += `?rdm=${new Date().getTime()}`;
        }
        return source;
    }, [ avatar, email, defaultValue, edition, withReload ]);


    // Do the Render
    if (!source) {
        return <React.Fragment />;
    }
    return <Container
        ref={passedRef}
        className={className}
        size={size}
        hasClick={hasClick}
        onClick={handleClick}
    >
        <Image
            alt={name}
            src={source}
            width={size}
            height={size}
        />
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Avatar.propTypes = {
    passedRef    : PropTypes.any,
    className    : PropTypes.string,
    size         : PropTypes.number,
    name         : PropTypes.string,
    email        : PropTypes.string,
    avatar       : PropTypes.string,
    url          : PropTypes.string,
    href         : PropTypes.string,
    target       : PropTypes.string,
    defaultValue : PropTypes.string,
    edition      : PropTypes.number,
    withReload   : PropTypes.bool,
    onClick      : PropTypes.func,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Avatar.defaultProps = {
    className    : "",
    size         : 36,
    target       : "_self",
    withReload   : false,
    defaultValue : "mp",
};

export default Avatar;
