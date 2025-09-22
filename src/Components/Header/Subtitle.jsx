import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Circle               from "../Common/Circle";



// Styles
const H3 = Styled.h3.attrs(({ withBorder }) => ({ withBorder }))`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding-left: var(--main-padding);
    color: var(--darkest-gray);
    font-weight: 400;
    font-size: 15px;
    line-height: 1.5;
    overflow: hidden;

    ${(props) => props.withBorder && `
        border-left: 1px solid var(--darker-gray);
    `}
`;

const SubCircle = Styled(Circle)`
    width: 10px;
    height: 10px;
    margin: 0;
    opacity: 0.8;
`;



/**
 * The Subtitle Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Subtitle(props) {
    const { message, circle, withBorder } = props;


    // Do the Render
    if (!message) {
        return <React.Fragment />;
    }
    return <H3 className="subtitle" withBorder={withBorder}>
        {!!circle && <SubCircle variant={circle} />}
        {NLS.get(message)}
    </H3>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Subtitle.propTypes = {
    message    : PropTypes.string,
    circle     : PropTypes.string,
    withBorder : PropTypes.bool,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Subtitle.defaultProps = {
    withBorder : true,
};

export default Subtitle;
