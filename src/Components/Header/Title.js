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

const TitleIcon = Styled(Icon)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
`;

const Text = Styled.span`
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
    return <Container className="title">
        {href ? <IconLink
            variant="light"
            icon="back"
            href={href}
            isSmall
        /> : <TitleIcon
            icon={icon}
        />}
        <Text>{message ? NLS.get(message) : NLS.get(fallback)}</Text>
    </Container>;
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
