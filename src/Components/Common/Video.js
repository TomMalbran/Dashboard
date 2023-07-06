import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Div = Styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
`;

const Frame = Styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
`;



/**
 * The YouTube Video Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Video(props) {
    const { className, title, source, width, height } = props;

    const src = Utils.getYouTubeEmbed(source);

    if (!src) {
        return <React.Fragment />;
    }
    return <Div className={className}>
        <Frame
            width={width}
            height={height}
            title={title}
            src={src}
            frameBorder="0"
            allow="encrypted-media;"
            allowFullScreen
        />
    </Div>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Video.propTypes = {
    className : PropTypes.string,
    title     : PropTypes.string.isRequired,
    source    : PropTypes.string.isRequired,
    width     : PropTypes.string,
    height    : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Video.defaultProps = {
    className : "",
    width     : "500",
    height    : "315",
};

export default Video;
