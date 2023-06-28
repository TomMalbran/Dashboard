import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";



// Styles
const H2 = Styled.h2`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: var(--title-color);
    font-family: var(--title-font);
    font-weight: 400;
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: 1px;
    overflow: hidden;

    @media (max-width: 500px) {
        font-size: 20px;
        line-height: 1;
    }
`;

const Span = Styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;



/**
 * The Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Title(props) {
    const { icon, message, fallback, href } = props;


    // Do the Render
    return <H2 className="title">
        {href ? <IconLink
            variant="light"
            icon="back"
            href={href}
        /> : <Icon
            icon={icon}
        />}
        <Span>{message ? NLS.get(message) : NLS.get(fallback)}</Span>
    </H2>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Title.propTypes = {
    icon     : PropTypes.string.isRequired,
    message  : PropTypes.string,
    fallback : PropTypes.string,
    href     : PropTypes.string,
};

export default Title;
