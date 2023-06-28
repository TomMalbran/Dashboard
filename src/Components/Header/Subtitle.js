import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import Circle               from "../Common/Circle";



// Styles
const H3 = Styled.h3`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding-left: var(--main-padding);
    border-left: 1px solid var(--darker-gray);
    color: var(--lighter-color);
    font-weight: 400;
    font-size: 15px;
    line-height: 1.5;
    overflow: hidden;
`;

const SubCircle = Styled(Circle)`
    width: 10px;
    height: 10px;
    margin: 0;
    opacity: 0.8;
`;



/**
 * The Subtitle Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Subtitle(props) {
    const { message, circle } = props;


    // Do the Render
    if (!message) {
        return <React.Fragment />;
    }
    return <H3 className="title">
        {!!circle && <SubCircle variant={circle} />}
        {NLS.get(message)}
    </H3>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Subtitle.propTypes = {
    message : PropTypes.string,
    circle  : PropTypes.string,
};

export default Subtitle;
