import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Avatar               from "../Avatar/Avatar";
import Icon                 from "../Common/Icon";



// Styles
const Li = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
    position: relative;
    display: flex;
    padding: 16px;
    cursor: pointer;

    ${(props) => props.isSelected && `
        background-color: var(--light-gray);
    `}
`;

const LiAvatar = Styled(Avatar)`
    flex-shrink: 0;
    width: 32px;
    border-radius: 50%;
    margin-right: 16px;
`;

const LiIcon = Styled(Icon)`
    position: absolute;
    right: 16px;
    top: 50%;
    font-size: 24px;
    color: var(--accent-color);
    transform: translateY(-50%);
`;

const H3 = Styled.h3`
    margin: 0 0 4px 0;
`;
const P = Styled.p`
    margin: 0;
`;



/**
 * The Avatar Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AvatarItem(props) {
    const { className, isSelected, onClick, name, email, data } = props;

    return <Li className={className} isSelected={isSelected} onClick={onClick}>
        <LiAvatar name={name} data={data} />
        <div className="lead-credential">
            <H3>{name}</H3>
            <P>{email}</P>
        </div>
        <LiIcon
            isHidden={!isSelected}
            className="lead-icon"
            icon="check"
        />
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
AvatarItem.propTypes = {
    className  : PropTypes.string,
    isSelected : PropTypes.bool,
    onClick    : PropTypes.func,
    name       : PropTypes.string.isRequired,
    email      : PropTypes.string.isRequired,
    data       : PropTypes.object.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
AvatarItem.defaultProps = {
    className  : "",
    isSelected : false,
};

export default AvatarItem;
