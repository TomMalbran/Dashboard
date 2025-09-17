import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import NLS                  from "../../Core/NLS";

// Components
import InputLabel           from "../Input/InputLabel";
import InputContainer       from "../Input/InputContainer";
import InputCopy            from "../Input/InputCopy";
import HyperLink            from "../Link/HyperLink";
import IconLink             from "../Link/IconLink";
import Icon                 from "../Common/Icon";
import Html                 from "../Common/Html";
import MultiLine            from "../Common/MultiLine";



// Styles
const FieldLabel = Styled(InputLabel).attrs(({ isSelected }) => ({ isSelected }))`
    ${(props) => props.isSelected && "background-color: var(--lighter-gray);"}
`;

const FieldContent = Styled.div.attrs(({ isSmall, withLink, isSelected }) => ({ isSmall, withLink, isSelected }))`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: var(--input-font);
    background-color: var(--content-color);
    border: 1px solid var(--input-border);
    border-radius: var(--border-radius);
    transition: all 0.2s;

    .inputview-value {
        width: 100%;
        box-sizing: border-box;
        color: var(--black-color);
        overflow: auto;

        ${(props) => props.isSelected && `
            border-radius: var(--border-radius);
            background-color: var(--lighter-gray);
        `}
        ${(props) => props.isSmall ? `
            min-height: calc(var(--input-height) - 7px - 2px);
            padding: 4px 8px;
            line-height: 1;
        ` : `
            min-height: calc(var(--input-height) - 2px);
            padding: var(--input-padding);
            line-height: 1.5;
        `}
        ${(props) => props.withLink && "cursor: pointer;"}
        padding-top: calc(var(--input-label) + 2px);
    }

    .inputview-link {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover {
        --input-border: var(--input-border-hover);
    }
`;

const FieldIcon = Styled(Icon)`
    margin-top: 8px;
    margin-left: 8px;
`;

const FieldLink = Styled(IconLink)`
    flex-shrink: 0;
    font-size: 20px;
    margin-left: 4px;
`;

const FieldError = Styled.p`
    font-size: 12px;
    margin: 4px 0 0 4px;
    color: #ff0033;
`;

const FieldHelper = Styled.p`
    font-size: 0.9em;
    margin: 4px 0 0 4px;
    color: var(--darkest-gray);
`;



/**
 * The Input View Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function ViewField(props) {
    const {
        isHidden, showEmpty, className, viewClass, textColor,
        label, value, copyValue, message, icon,
        fullWidth, isSmall, isSelected, error, helperText,
        linkIcon, linkVariant, linkUrl, linkHref, linkTarget,
        isEmail, isPhone, isWhatsApp, hasCopy, onClick,
    } = props;


    // Variables
    const content   = message ? NLS.get(message) : (value === undefined ? "" : String(value));
    const isLink    = content.startsWith("http");
    const isHtml    = !isLink && (content.includes("<br>") || content.includes("<b>") || content.includes("<i>"));
    const isText    = !isLink && !isHtml;
    const hasLabel  = !!label;
    const hasLink   = Boolean(linkIcon && linkHref);
    const hasError  = Boolean(error);
    const hasHelper = !hasError && Boolean(helperText);
    const floatCopy = content.length > 1000 || isHtml;


    // Do the Render
    if (isHidden || (!content && !showEmpty)) {
        return <React.Fragment />;
    }
    return <InputContainer
        className={`inputview ${className}`}
        fullWidth={fullWidth}
    >
        {hasLabel && <FieldLabel
            className="inputview-label"
            message={label}
            isSelected={isSelected}
            withTransform
            withValue
        />}
        <FieldContent
            className="inputview-cnt"
            isSmall={isSmall}
            withLink={!!onClick}
            isSelected={isSelected}
        >
            {!!icon && <FieldIcon icon={icon} />}
            {isLink && <div className="inputview-value inputview-link">
                <HyperLink
                    variant="primary"
                    href={content}
                    message={content}
                    target="_blank"
                />
            </div>}
            {isHtml && <Html
                className="inputview-value"
                onClick={onClick}
                content={content}
            />}
            {isText && <MultiLine
                className={`inputview-value ${textColor ? `text-${textColor}` : viewClass}`}
                onClick={onClick}
                content={content || " "}
            />}
            {hasLink && <FieldLink
                variant={linkVariant}
                icon={linkIcon}
                url={linkUrl}
                href={linkHref}
                target={linkTarget}
                isEmail={isEmail}
                isPhone={isPhone}
                isWhatsApp={isWhatsApp}
            />}
            <InputCopy
                isHidden={!hasCopy}
                copyValue={copyValue}
                inputValue={content}
                isFloating={floatCopy}
            />
        </FieldContent>
        {hasError  && <FieldError>{NLS.get(error)}</FieldError>}
        {hasHelper && <FieldHelper>{NLS.get(helperText)}</FieldHelper>}
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
    textColor   : PropTypes.string,
    label       : PropTypes.string,
    icon        : PropTypes.string,
    value       : PropTypes.any,
    copyValue   : PropTypes.any,
    message     : PropTypes.string,
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
    hasCopy     : PropTypes.bool,
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
    textColor  : "",
    fullWidth  : false,
    isSmall    : false,
    isSelected : false,
    linkTarget : "_blank",
    isEmail    : false,
    isPhone    : false,
    isWhatsApp : false,
    hasCopy    : false,
};

export default ViewField;
