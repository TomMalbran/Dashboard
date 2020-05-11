import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import InputLabel           from "../Input/InputLabel";
import InputContainer       from "../Input/InputContainer";
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";
import MultiLine            from "../Common/MultiLine";



// Styles
const InputContent = Styled.div`
    display: flex;
    align-items: center;

    .inputview-value {
        width: 100%;
        padding: 8px 8px 0 8px;
        line-height: 1.5;
        box-sizing: border-box;
        min-height: var(--input-height);
        color: var(--black-color);
        background-color: white;
        border: 1px solid var(--lighter-color);
        border-radius: var(--border-radius);
        transition: all 0.2s;
    }
`;



/**
 * The Input View Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ViewField(props) {
    const { className, label, value, icon, fullWidth, noMargin, showEmpty, isHidden } = props;
    
    const content = String(value);
    const isHtml  = content.includes("<br>") || content.includes("<b>") || content.includes("<i>");

    if (isHidden || (!content && !showEmpty)) {
        return <React.Fragment />;
    }
    return <InputContainer
        className={`inputview ${className}`}
        fullWidth={fullWidth}
        noMargin={noMargin}
        hasLabel
    >
        <InputLabel
            className="inputview-label"
            message={label}
            withTransform
            withValue
        />
        <InputContent className="inputview-cnt">
            {!!icon  && <Icon icon={icon} />}
            {isHtml  && <Html className="inputview-value">{content}</Html>}
            {!isHtml && <MultiLine className="inputview-value">{content}</MultiLine>}
        </InputContent>
    </InputContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ViewField.propTypes = {
    className : PropTypes.string,
    label     : PropTypes.string,
    icon      : PropTypes.string,
    value     : PropTypes.any,
    noMargin  : PropTypes.bool,
    fullWidth : PropTypes.bool,
    showEmpty : PropTypes.bool,
    isHidden  : PropTypes.bool,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
ViewField.defaultProps = {
    className : "",
    noMargin  : false,
    fullWidth : false,
    showEmpty : false,
};

export default ViewField;
