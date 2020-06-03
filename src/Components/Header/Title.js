import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Icon                 from "../Common/Icon";



// Styles
const H2 = Styled.h2`
    display: flex;
    align-items: center;
    margin: 0;
    color: var(--title-color);
    font-family: var(--title-font);
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: 1px;

    .icon {
        margin-right: 8px;
    }

    @media (max-width: 500px) {
        font-size: 20px;
        line-height: 1;
    }
`;



/**
 * The Title Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Title(props) {
    const { icon, message, fallback } = props;
    
    return <H2 className="title">
        <Icon icon={icon} />
        {message ? NLS.get(message) : NLS.get(fallback)}
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
};

export default Title;
