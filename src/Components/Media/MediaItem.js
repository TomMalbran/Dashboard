import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core
import Action               from "../../Core/Action";

// Components
import Icon                 from "../Common/Icon";


// Styles
const Div = Styled.div.attrs(({ isSelected, hasActions }) => ({ isSelected, hasActions }))`
    position: relative;
    cursor: pointer;
    border: 2px solid var(--light-gray);
    border-radius: var(--border-radius);
    background-color: white;

    ${(props) => props.isSelected && "border-color: var(--primary-color);"}
    ${(props) => props.hasActions && `
        &:hover .media-name {
            transform: translateY(-20px);
        }
    `}
`;

const MediaElem = Styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    border-bottom: none;
`;
const MediaImage = Styled(MediaElem)`
    img {
        margin: 0 auto;
        max-width: 96px;
        max-height: 96px;
    }
`;
const MediaIcon = Styled(MediaElem)`
    font-size: 48px;
`;

const MediaName = Styled.div`
    position: relative;
    padding: 6px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    background-color: var(--light-gray);
    transition: all 0.2s;
    z-index: 1;
`;



/**
 * The Media Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MediaItem(props) {
    const { isSelected, hasActions, onAction, elem     } = props;
    const { isFile, isImage, icon, source, thumb, name } = elem;

    // Handles the Action
    const handleAction = (action, e) => {
        if (onAction) {
            onAction(Action.get(action), elem);
        }
        e.stopPropagation();
        e.preventDefault();
    };

    return <Div
        isSelected={isSelected}
        hasActions={hasActions}
        onClick={(e) => handleAction("SELECT", e)}
    >
        {isFile && <MediaIcon className="media-icon">
            <Icon icon={icon} />
        </MediaIcon>}
        {isImage && <MediaImage className="media-image">
            <img src={thumb || source} alt={name} />
        </MediaImage>}
        <MediaName className="media-name">
            {name}
        </MediaName>

        {hasActions && <div className="media-actions">
            <Icon
                icon={Action.get("VIEW").icon}
                onClick={(e) => handleAction("VIEW", e)}
            />
            <Icon
                icon={Action.get("EDIT").icon}
                onClick={(e) => handleAction("EDIT", e)}
            />
            <Icon
                icon={Action.get("DELETE").icon}
                onClick={(e) => handleAction("DELETE", e)}
            />
        </div>}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MediaItem.propTypes = {
    isSelected : PropTypes.bool,
    hasActions : PropTypes.bool,
    elem       : PropTypes.object,
    onAction   : PropTypes.func,
};

export default MediaItem;
