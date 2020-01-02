import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";



// Styles
const VideoContent = Styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
`;

const VideoFrame = Styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
`;



/**
 * Returns the Youtube Embed link
 * @param {String} source
 * @returns {String}
 */
function getEmbed(source) {
    let videoID = "";
    if (source.startsWith("https://youtu.be/")) {
        videoID = source.replace("https://youtu.be/", "");
    } else if (source.startsWith("https://www.youtube.com/watch?v=")) {
        videoID = source.replace("https://www.youtube.com/watch?v=", "");
    }
    if (!videoID) {
        return "";
    }
    return `https://www.youtube-nocookie.com/embed/${videoID}?version=3&modestbranding=1&rel=0&showinfo=0`;
}



/**
 * The YouTube Video Component
 * @param {Object} props
 * @returns {Object}
 */
function Video(props) {
    const { className, title, source, width, height } = props;
    const src = getEmbed(source);

    if (!src) {
        return <React.Fragment />;
    }
    return <VideoContent className={className}>
        <VideoFrame
            width={width}
            height={height}
            title={title}
            src={src}
            frameBorder="0"
            allow="encrypted-media;"
            allowFullScreen
        />
    </VideoContent>;
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
