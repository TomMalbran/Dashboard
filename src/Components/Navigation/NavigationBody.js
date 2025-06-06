import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import { Brightness }       from "../../Core/Variants";
import Action               from "../../Core/Action";
import Utils                from "../../Utils/Utils";

// Components
import NoneAvailable        from "../Common/NoneAvailable";
import CircularLoader       from "../Loader/CircularLoader";
import NavigationList       from "../Navigation/NavigationList";
import Button               from "../Form/Button";



// Styles
const Container = Styled.nav.attrs(({ withSpacing }) => ({ withSpacing }))`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${(props) => props.withSpacing && "0 12px 16px 6px"};
`;

const None = Styled(NoneAvailable)`
    padding: 4px 0 24px 0;
    font-size: 14px;
    text-align: center;
    background-color: transparent;
`;

const Ul = Styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;



/**
 * The Navigation Body Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function NavigationBody(props) {
    const {
        className, variant, onAction, onClose,
        isLoading, none, canAdd, add, withSpacing, children,
    } = props;

    // Handles the Action
    const handleAdd = (e) => {
        if (onAction) {
            onAction(Action.get("ADD"));
        }
        e.stopPropagation();
        e.preventDefault();
    };


    // Parse the Items
    const items   = [];
    let   addList = true;
    for (const [ key, child ] of Utils.getChildren(children).entries()) {
        if (child.type === NavigationList) {
            addList = false;
        }
        if (!child.props.isHidden) {
            items.push(React.cloneElement(child, {
                key, variant, onAction, onClose,
            }));
        }
    }


    // Variables
    const showLoader  = isLoading;
    const showNone    = Boolean(!isLoading && !items.length && none);
    const showAdd     = Boolean(showNone && canAdd && add);
    const showItems   = Boolean(!isLoading && items.length);
    const compVariant = variant === Brightness.DARK ? "white" : "primary";
    const scrollbars  = variant === Brightness.DARK ? "dark-scrollbars" : "light-scrollbars";


    // Do the Render
    return <Container
        className={`navigation-body ${scrollbars} ${className}`}
        withSpacing={withSpacing}
    >
        {showLoader && <CircularLoader variant={compVariant} />}
        {showNone   && <div>
            <None variant={compVariant} message={none} />
            {showAdd && <Button
                variant="outlined-accent"
                icon="add"
                message={add}
                onClick={(e) => handleAdd(e)}
                fullWidth
            />}
        </div>}
        {showItems  && (addList ? <Ul>{items}</Ul> : items)}
    </Container>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
NavigationBody.propTypes = {
    className   : PropTypes.string,
    variant     : PropTypes.string,
    isLoading   : PropTypes.bool,
    none        : PropTypes.string,
    canAdd      : PropTypes.bool,
    add         : PropTypes.string,
    withSpacing : PropTypes.bool,
    onAction    : PropTypes.func,
    onClose     : PropTypes.func,
    children    : PropTypes.any,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
NavigationBody.defaultProps = {
    className   : "",
    none        : "",
    isLoading   : false,
    withSpacing : true,
};

export default NavigationBody;
