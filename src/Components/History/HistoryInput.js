import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Avatar               from "../Avatar/Avatar";
import InputField           from "../Form/InputField";
import Button               from "../Form/Button";



// Styles
const Li = Styled.li`
    position: relative;
    margin: 0 0 24px 52px;
    color: var(--black-color);
`;

const HistoryAvatar = Styled(Avatar)`
    position: absolute;
    top: 16px;
    left: -54px;
    margin-top: -20px;
    border: 4px solid white;

    & > img {
        border: none;
    }
`;

const Content = Styled.div`
    padding: 8px 12px;
    border: 1px solid rgb(209,213,218);
    border-radius: var(--border-radius);

    &:before {
        content: "";
        position: absolute;
        top: 17px;
        left: 0;
        width: 8px;
        height: 8px;
        border-top: 1px solid rgb(209,213,218);
        border-left: 1px solid rgb(209,213,218);
        background-color: white;
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;

const Footer = Styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
`;



/**
 * The History Input Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function HistoryInput(props) {
    const { className, name, email, avatar, label, button, initialValue, onSubmit } = props;

    const [ value, setValue ] = React.useState(initialValue);

    // Handles the Input Change
    const handleChange = (name, value) => {
        setValue(value);
    };

    // Handles the Submit
    const handleSubmit = () => {
        if (value) {
            onSubmit(value);
            setValue("");
        }
    };

    // Update the Initial Value
    React.useEffect(() => {
        setValue(initialValue);
    }, [ initialValue ]);


    return <Li className={className}>
        <HistoryAvatar
            name={name}
            email={email}
            avatar={avatar}
            size={32}
        />
        <Content>
            <InputField
                type="textarea"
                name="message"
                label={label}
                value={value}
                onChange={handleChange}
                noMargin
            />
            <Footer>
                <Button
                    variant="primary"
                    message={button}
                    onSubmit={handleSubmit}
                />
            </Footer>
        </Content>
    </Li>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
HistoryInput.propTypes = {
    className    : PropTypes.string,
    name         : PropTypes.string,
    email        : PropTypes.string,
    avatar       : PropTypes.string,
    label        : PropTypes.string,
    button       : PropTypes.string,
    initialValue : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onSubmit     : PropTypes.func.isRequired,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
HistoryInput.defaultProps = {
    className    : "",
    label        : "GENERAL_SEND_MESSAGE",
    button       : "GENERAL_SEND",
    initialValue : "",
};

export default HistoryInput;
