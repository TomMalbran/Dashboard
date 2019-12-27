'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

/**
 * Downloads the Source
 * @param {Object} props
 * @returns {Object}
 */
function Download(props) {
    var src = props.src;


    return React.createElement("iframe", {
        title: "Downloader",
        src: src + "&rdm=" + new Date().getTime(),
        name: "app-frame",
        className: "app-frame",
        style: { display: "none" }
    });
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Download.propTypes = {
    src: PropTypes.string.isRequired
};

module.exports = Download;
