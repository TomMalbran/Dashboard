import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import DialogAction         from "./DialogAction";
import Button               from "../Form/Button";



// Styles
const Footer = Styled.footer`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--dialog-footer);
    padding: 0 24px;
    background-color: var(--light-gray);

    @media (max-width: 500px) {
        padding: 0 16px;
    }
`;

const Secondary = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;



/**
 * The Dialog Footer Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogFooter(props) {
    const {
        className, primary, secondary, cancel,
        onAction, onSubmit, onSecondary, dontClose, onClose,
        isLoading, isDisabled, children,
    } = props;

    // Handles the Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const items   = [];
    const actions = [];
    for (const [ key, child ] of Utils.getVisibleChildren(children)) {
        if (child.type === DialogAction) {
            actions.push(React.cloneElement(child, {
                key, onAction,
            }));
        } else {
            items.push(React.cloneElement(child, { key }));
        }
    }


    return <Footer className={className}>
        <Secondary>
            {!isLoading && <>
                {actions}
                {items}
                {!!secondary && <Button
                    variant="primary"
                    message={secondary}
                    onClick={onSecondary}
                />}
            </>}
        </Secondary>
        <div>
            <Button
                isHidden={!primary}
                variant="primary"
                message={primary}
                isDisabled={isDisabled}
                onClick={handleSubmit}
            />
            <Button
                isHidden={dontClose}
                variant="outlined"
                message={cancel}
                onClick={onClose}
            />
        </div>
    </Footer>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogFooter.propTypes = {
    className   : PropTypes.string,
    primary     : PropTypes.string,
    secondary   : PropTypes.string,
    cancel      : PropTypes.string,
    onAction    : PropTypes.func,
    onSubmit    : PropTypes.func,
    onSecondary : PropTypes.func,
    dontClose   : PropTypes.bool,
    onClose     : PropTypes.func,
    isLoading   : PropTypes.bool,
    isDisabled  : PropTypes.bool,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
DialogFooter.defaultProps = {
    className  : "",
    cancel     : "GENERAL_CANCEL",
    dontClose  : false,
    isLoading  : false,
    isDisabled : false,
};

export default DialogFooter;
