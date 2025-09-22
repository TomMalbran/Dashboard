import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";



// Styles
const Container = Styled.video`
    display: block;
    height: 100%;
    max-width: 100%;
    max-height: var(--dialog-body);
    margin: 0 auto;
    object-fit: contain;
    object-position: center;
`;

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
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Video(props) {
    const { className, title, source, width, height } = props;

    const youtube = Utils.getYouTubeEmbed(source);


    // Do the Render
    if (!source) {
        return <React.Fragment />;
    }
    if (!youtube && source) {
        return <Container
            className={className}
            src={source}
            width={width}
            height={height}
            controls
        />;
    }
    return <Div className={className}>
        <Frame
            width={width}
            height={height}
            title={title}
            src={youtube}
            frameBorder="0"
            allow="encrypted-media;"
            allowFullScreen
        />
    </Div>;
}

/**
 * The Property Types
 * @type {object} propTypes
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
 * @type {object} defaultProps
 */
Video.defaultProps = {
    className : "",
    width     : "500",
    height    : "315",
};

export default Video;
