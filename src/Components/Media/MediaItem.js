import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";

// Components
import Icon                 from "../Common/Icon";
import IconLink             from "../Link/IconLink";



// Styles
const Div = Styled.div.attrs(({ isSelected, hasActions }) => ({ isSelected, hasActions }))`
    position: relative;
    border: var(--media-border-width) solid var(--media-border-color);
    border-radius: var(--border-radius);
    background-color: white;
    overflow: hidden;
    cursor: pointer;

    ${(props) => props.isSelected && `
        border-color: var(--primary-color);
    `}
    ${(props) => props.hasActions && `
        &:hover .media-name {
            transform: translateY(-20px);
        }
    `}
`;

const MediaElem = Styled.div.attrs(({ isTransparent }) => ({ isTransparent }))`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    border-bottom: none;
    overflow: hidden;

    img {
        margin: 0 auto;
        max-width: 96px;
        max-height: 96px;
    }
    .icon {
        font-size: 48px;
    }

    ${(props) => props.isTransparent && `
        background-color: var(--media-trans-light);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
        background-image: linear-gradient(45deg, var(--media-trans-dark) 25%, transparent 25%, transparent 75%, var(--media-trans-dark) 75%, var(--media-trans-dark)),
                          linear-gradient(45deg, var(--media-trans-dark) 25%, transparent 25%, transparent 75%, var(--media-trans-dark) 75%, var(--media-trans-dark));
    `}
`;

const MediaName = Styled.div`
    position: relative;
    padding: 6px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    color: var(--black-color);
    background-color: var(--media-name-color);
    transition: all 0.2s;
    z-index: 1;
`;

const MediaActions = Styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--media-actions-color);
`;

const MediaLink = Styled(IconLink)`
    --link-size: 20px;
    --link-font: 14px;
    --link-radius: var(--border-radius-small);
`;

const Image = Styled.img`
    pointer-events: none;
`;



/**
 * The Media Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MediaItem(props) {
    const { isSelected, hasActions, onAction, elem, className, style, onMouseDown } = props;
    const { isFile, isImage, isTransparent, icon, source, thumb, name             } = elem;

    // Variables
    const select = Action.get("SELECT");
    const view   = Action.get("VIEW");
    const edit   = Action.get("EDIT");
    const remove = Action.get("DELETE");


    // Handles the Action
    const handleAction = (e, action) => {
        if (onAction) {
            onAction(action, elem, e);
        }
        e.stopPropagation();
        e.preventDefault();
    };


    // Do the Render
    return <Div
        className={className}
        style={style}
        isSelected={isSelected}
        hasActions={hasActions}
        onClick={(e) => handleAction(e, select)}
    >
        {isFile && <MediaElem
            className="media-icon"
            onMouseDown={onMouseDown}
        >
            <Icon icon={icon} />
        </MediaElem>}

        {isImage && <MediaElem
            className="media-image"
            isTransparent={isTransparent}
            onMouseDown={onMouseDown}
        >
            <Image src={thumb || source} alt={name} />
        </MediaElem>}

        <MediaName className="media-name">
            {name}
        </MediaName>

        {hasActions && <MediaActions className="media-actions">
            <MediaLink
                icon={view.icon}
                onClick={(e) => handleAction(e, view)}
            />
            <MediaLink
                icon={edit.icon}
                onClick={(e) => handleAction(e, edit)}
            />
            <MediaLink
                icon={remove.icon}
                onClick={(e) => handleAction(e, remove)}
            />
        </MediaActions>}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MediaItem.propTypes = {
    isSelected  : PropTypes.bool,
    hasActions  : PropTypes.bool,
    elem        : PropTypes.object,
    className   : PropTypes.string,
    style       : PropTypes.object,
    onAction    : PropTypes.func,
    onMouseDown : PropTypes.func,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
MediaItem.defaultProps = {
    className : "",
};

export default MediaItem;
