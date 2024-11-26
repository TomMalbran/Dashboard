import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Iframe Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Iframe(props) {
    const { isHidden, className, content } = props;


    // The Reference
    const frameRef = React.useRef(null);

    // The Current State
    const [ height, setHeight ] = React.useState("0px");


    // Updates the Height
    const onLoad = () => {
        const height = frameRef.current.contentWindow.document.body.scrollHeight;
        setHeight(`${height + 16}px`);
    };

    // Calls the on Load on Mount
    React.useEffect(() => {
        onLoad();
    }, []);



    // Nothing to Render
    if (isHidden || !content) {
        return <React.Fragment />;
    }

    return <iframe
        ref={frameRef}
        className={className}
        onLoad={onLoad}
        srcDoc={content}
        height={height}
        // scrolling="no"
        frameBorder="0"
    />;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Iframe.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    content   : PropTypes.string,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
Iframe.defaultProps = {
    isHidden  : false,
    className : "",
    content   : "",
};

export default Iframe;
