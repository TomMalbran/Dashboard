import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import InputLabel           from "../Input/InputLabel";
import InputContainer       from "../Input/InputContainer";
import HyperLink            from "../Link/HyperLink";
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";
import MultiLine            from "../Common/MultiLine";



// Styles
const InputContent = Styled.div.attrs(({ isSmall }) => ({ isSmall }))`
    display: flex;
    align-items: center;

    .inputview-value {
        width: 100%;
        box-sizing: border-box;
        color: var(--black-color);
        background-color: white;
        border: 1px solid var(--lighter-color);
        border-radius: var(--border-radius);
        transition: all 0.2s;
        overflow: auto;
        
        ${(props) => props.isSmall ? `
            min-height: calc(var(--input-height) - 7px);
            padding: 8px 8px 4px 8px;
            line-height: 1;
        ` : `
            min-height: var(--input-height);
            padding: 8px 8px 6px 8px;
            line-height: 1.5;
        `}
    }
    .inputview-link {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const ViewLink = Styled(IconLink)`
    flex-shrink: 0;
    font-size: 20px;
    margin-left: 4px;
`;



/**
 * The Input View Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ViewField(props) {
    const {
        isHidden, showEmpty, className, label, value, icon,
        fullWidth, smallMargin, noMargin, isSmall,
        linkIcon, linkVariant, linkUrl, linkHref, linkTarget, isEmail, isPhone, isWhatsApp, onClick,
    } = props;
    
    const content  = value === undefined ? "" : String(value);
    const isLink   = content.startsWith("http");
    const isHtml   = !isLink && content.includes("<br>") || content.includes("<b>") || content.includes("<i>");
    const isText   = !isLink && !isHtml;
    const hasLabel = !!label;
    const hasLink  = Boolean(linkIcon && linkHref);

    if (isHidden || (!content && !showEmpty)) {
        return <React.Fragment />;
    }
    return <InputContainer
        className={`inputview ${className}`}
        fullWidth={fullWidth}
        smallMargin={smallMargin}
        noMargin={noMargin}
        hasLabel
    >
        {hasLabel && <InputLabel
            className="inputview-label"
            message={label}
            withTransform
            withValue
        />}
        <InputContent className="inputview-cnt" isSmall={isSmall}>
            {!!icon && <Icon icon={icon} />}
            {isLink && <div className="inputview-value inputview-link">
                <HyperLink variant="primary" href={content} message={content} target="_blank" />
            </div>}
            {isHtml && <Html className="inputview-value">{content}</Html>}
            {isText && <MultiLine className="inputview-value">{content}</MultiLine>}
            {hasLink && <ViewLink
                variant={linkVariant}
                icon={linkIcon}
                url={linkUrl}
                href={linkHref}
                target={linkTarget}
                isEmail={isEmail}
                isPhone={isPhone}
                isWhatsApp={isWhatsApp}
                onClick={onClick}
            />}
        </InputContent>
    </InputContainer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
ViewField.propTypes = {
    isHidden    : PropTypes.bool,
    showEmpty   : PropTypes.bool,
    className   : PropTypes.string,
    label       : PropTypes.string,
    icon        : PropTypes.string,
    value       : PropTypes.any,
    smallMargin : PropTypes.bool,
    noMargin    : PropTypes.bool,
    fullWidth   : PropTypes.bool,
    isSmall     : PropTypes.bool,
    linkIcon    : PropTypes.string,
    linkVariant : PropTypes.string,    
    linkUrl     : PropTypes.string,    
    linkHref    : PropTypes.string,    
    linkTarget  : PropTypes.string,    
    isEmail     : PropTypes.bool,
    isPhone     : PropTypes.bool,
    isWhatsApp  : PropTypes.bool,
    onClick     : PropTypes.func,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
ViewField.defaultProps = {
    isHidden    : false,
    showEmpty   : false,
    className   : "",
    smallMargin : false,
    noMargin    : false,
    fullWidth   : false,
    isSmall     : false,
    linkTarget  : "_blank",
    isEmail     : false,
    isPhone     : false,
    isWhatsApp  : false,
};

export default ViewField;
