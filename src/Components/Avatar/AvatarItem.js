import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Avatar               from "../Avatar/Avatar";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 16px;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;

    ${(props) => props.isSelected ? `
        background-color: var(--light-gray);
    ` : `:hover {
        background-color: var(--lighter-gray);
    }`}
`;

const AvatarContent = Styled(Avatar)`
    flex-shrink: 0;
    border-radius: 50%;
`;

const IconContent = Styled(Icon)`
    position: absolute;
    right: 16px;
    top: 50%;
    color: var(--primary-color);
    transform: translateY(-50%);
`;

const Title = Styled.h3`
    margin: 0 0 4px 0;
`;

const Text = Styled.p`
    margin: 0;
`;



/**
 * The Avatar Item Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function AvatarItem(props) {
    const { className, isSelected, onClick, name, email, avatar } = props;


    // Do the Render
    return <Container
        className={className}
        isSelected={isSelected}
        onClick={onClick}
    >
        <AvatarContent
            name={name}
            email={email}
            avatar={avatar}
            size={32}
        />
        <div>
            <Title>{name}</Title>
            <Text>{email}</Text>
        </div>
        <IconContent
            isHidden={!isSelected}
            icon="check"
            size="24"
        />
    </Container>;
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
    avatar     : PropTypes.string.isRequired,
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
