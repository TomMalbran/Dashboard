import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import InputLabel           from "../Input/InputLabel";
import InputContainer       from "../Input/InputContainer";
import HyperLink            from "../Link/HyperLink";
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";
import MultiLine            from "../Common/MultiLine";



// Styles
const Label = Styled(InputLabel).attrs(({ isSelected }) => ({ isSelected }))`
    ${(props) => props.isSelected && "background-color: var(--lighter-gray);"}
`;

const InputContent = Styled.div.attrs(({ isSmall, withLink, isSelected }) => ({ isSmall, withLink, isSelected }))`
    display: flex;
    align-items: center;

    .inputview-value {
        width: 100%;
        box-sizing: border-box;
        color: var(--black-color);
        background-color: white;
        border: var(--input-border);
        border-radius: var(--border-radius);
        transition: all 0.2s;
        overflow: auto;

        ${(props) => props.isSelected && "background-color: var(--lighter-gray);"}
        ${(props) => props.isSmall ? `
            min-height: calc(var(--input-height) - 7px);
            padding: 4px 8px;
            line-height: 1;
        ` : `
            min-height: var(--input-height);
            padding: var(--input-padding);
            line-height: 1.5;
        `}
        ${(props) => props.withLink ? "cursor: pointer;" : ""}
        padding-top: 16px;
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

const InputError = Styled.p`
    font-size: 12px;
    margin: 4px 0 0 4px;
    color: #ff0033;
`;

const InputHelper = Styled.p`
    font-size: 0.9em;
    margin: 4px 0 0 4px;
    color: var(--lighter-color);
`;



/**
 * The Input View Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ViewField(props) {
    const {
        isHidden, showEmpty, className, viewClass, label, value, icon,
        fullWidth, isSmall, isSelected, error, helperText,
        linkIcon, linkVariant, linkUrl, linkHref, linkTarget, isEmail, isPhone, isWhatsApp, onClick,
    } = props;

    const content   = value === undefined ? "" : String(value);
    const isLink    = content.startsWith("http");
    const isHtml    = !isLink && content.includes("<br>") || content.includes("<b>") || content.includes("<i>");
    const isText    = !isLink && !isHtml;
    const hasLabel  = !!label;
    const hasLink   = Boolean(linkIcon && linkHref);
    const hasError  = Boolean(error);
    const hasHelper = !hasError && Boolean(helperText);

    if (isHidden || (!content && !showEmpty)) {
        return <React.Fragment />;
    }
    return <InputContainer
        className={`inputview ${className}`}
        fullWidth={fullWidth}
        hasLabel
    >
        {hasLabel && <Label
            className="inputview-label"
            message={label}
            isSelected={isSelected}
            withTransform
            withValue
        />}
        <InputContent
            className="inputview-cnt"
            isSmall={isSmall}
            withLink={!!onClick}
            isSelected={isSelected}
        >
            {!!icon && <Icon icon={icon} />}
            {isLink && <div className="inputview-value inputview-link">
                <HyperLink variant="primary" href={content} message={content} target="_blank" />
            </div>}
            {isHtml && <Html className="inputview-value" onClick={onClick}>{content}</Html>}
            {isText && <MultiLine className={`inputview-value ${viewClass}`} onClick={onClick}>
                {content || " "}
            </MultiLine>}
            {hasLink && <ViewLink
                variant={linkVariant}
                icon={linkIcon}
                url={linkUrl}
                href={linkHref}
                target={linkTarget}
                isEmail={isEmail}
                isPhone={isPhone}
                isWhatsApp={isWhatsApp}
            />}
        </InputContent>
        {hasError  && <InputError>{NLS.get(error)}</InputError>}
        {hasHelper && <InputHelper>{NLS.get(helperText)}</InputHelper>}
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
    viewClass   : PropTypes.string,
    label       : PropTypes.string,
    icon        : PropTypes.string,
    value       : PropTypes.any,
    error       : PropTypes.string,
    helperText  : PropTypes.string,
    fullWidth   : PropTypes.bool,
    isSmall     : PropTypes.bool,
    isSelected  : PropTypes.bool,
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
    isHidden   : false,
    showEmpty  : false,
    className  : "",
    viewClass  : "",
    fullWidth  : false,
    isSmall    : false,
    isSelected : false,
    linkTarget : "_blank",
    isEmail    : false,
    isPhone    : false,
    isWhatsApp : false,
};

export default ViewField;
