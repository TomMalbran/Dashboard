import React                from "react";
import PropTypes            from "prop-types";



/**
 * The Iframe Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Iframe(props) {
    const { isHidden, className, content, sandbox } = props;


    // The Reference
    const containerRef = React.useRef(null);

    // The Current State
    const [ height, setHeight ] = React.useState("0px");


    // Handles the Iframe height
    React.useEffect(() => {
        const observer = new ResizeObserver(([ entry ]) => {
            if (containerRef.current && entry.target.tagName.toLowerCase() === "iframe") {
                handleHeight();
            }
        });

        if (containerRef.current) {
            handleHeight();
            observer.observe(containerRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [ containerRef.current ]);

    // Updates the Height
    const handleHeight = () => {
        if (containerRef.current) {
            const height = containerRef.current.contentWindow?.document?.body?.scrollHeight ?? 0;
            setHeight(`${height + 24}px`);
        }
    };


    // Nothing to Render
    if (isHidden || !content) {
        return <React.Fragment />;
    }

    return <iframe
        ref={containerRef}
        className={className}
        onLoad={handleHeight}
        srcDoc={`<base target=&quot;_blank&quot;>${content}`}
        height={height}
        // scrolling="no"
        frameBorder="0"
        sandbox={sandbox}
    />;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Iframe.propTypes = {
    isHidden  : PropTypes.bool,
    className : PropTypes.string,
    content   : PropTypes.string,
    sandbox   : PropTypes.string,
    onClick   : PropTypes.func,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Iframe.defaultProps = {
    isHidden  : false,
    className : "",
    content   : "",
};

export default Iframe;
