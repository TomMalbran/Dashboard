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
    padding: 0 var(--main-padding);
    border-top: 1px solid var(--border-color-light);
    gap: 8px;

    @media (max-width: 500px) {
        padding: 0 16px;
    }
`;

const Primary = Styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Secondary = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
`;



/**
 * The Dialog Footer Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function DialogFooter(props) {
    const {
        isHidden, className, primary, onAction, onSubmit,
        secondary, onSecondary, tertiary, onTertiary,
        cancel, dontClose, onClose,
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


    if (isHidden) {
        return <React.Fragment />;
    }
    return <Footer className={className}>
        <Secondary>
            {!isLoading && <>
                {actions}
                {items}
                <Button
                    isHidden={!secondary}
                    variant="primary"
                    message={secondary}
                    onClick={onSecondary}
                />
                <Button
                    isHidden={!tertiary}
                    variant="primary"
                    message={tertiary}
                    isDisabled={isDisabled}
                    onClick={onTertiary}
                />
            </>}
        </Secondary>
        <Primary>
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
        </Primary>
    </Footer>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
DialogFooter.propTypes = {
    isHidden    : PropTypes.bool,
    className   : PropTypes.string,
    primary     : PropTypes.string,
    onAction    : PropTypes.func,
    onSubmit    : PropTypes.func,
    tertiary    : PropTypes.string,
    onTertiary  : PropTypes.func,
    secondary   : PropTypes.string,
    onSecondary : PropTypes.func,
    cancel      : PropTypes.string,
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
    isHidden   : false,
    className  : "",
    cancel     : "GENERAL_CANCEL",
    dontClose  : false,
    isLoading  : false,
    isDisabled : false,
};

export default DialogFooter;
