import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import Menu                 from "../Menu/Menu";
import Html                 from "../Common/Html";
import Icon                 from "../Common/Icon";



// Styles
const Container = Styled.li.attrs(({ isSelected }) => ({ isSelected }))`
    margin: 0;
    padding: 8px;
    font-size: 14px;
    color: var(--title-color);
    border-radius: var(--border-radius);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: var(--light-gray);
    }

    ${(props) => props.isSelected && `
        background-color: var(--primary-color);
        color: white;
        &:hover {
            background-color: var(--primary-color);
        }
    `}
`;

const Content = Styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Text = Styled(Html)`
    flex-grow: 2;
`;

const Description = Styled(Html).attrs(({ isSelected }) => ({ isSelected }))`
    color: var(--font-lightest);
    font-size: 13px;
    margin-top: 4px;

    ${(props) => props.isSelected && `
        color: rgba(255, 255, 255, 0.8);
    `}
`;



/**
 * The Input Option Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function InputOption(props) {
    const {
        className, icon, content, description,
        isSelected, hasChecks, isChecked, onMouseDown,
        direction, onClose, children,
    } = props;


    // The References
    const itemRef = React.useRef();

    // The Current State
    const [ menuOpen, setMenuOpen ] = React.useState(false);


    // Variable
    const hasIcon   = Boolean(icon || hasChecks);
    const iconValue = hasChecks ? (isChecked ? "checkbox-on" : "checkbox-off") : (icon || "");
    const hasMenu   = Boolean(children && children.length);


    // Do the Render
    return <>
        <Container
            ref={itemRef}
            className={className}
            content={content}
            isSelected={isSelected}
            onMouseDown={onMouseDown}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
        >
            <Content>
                <Icon
                    isHidden={!hasIcon}
                    icon={iconValue}
                    size="20"
                />
                <Text content={content} />
                <Icon
                    isHidden={!hasMenu}
                    icon="closed"
                    size="20"
                />
            </Content>
            <Description
                content={description}
                isSelected={isSelected}
            />
        </Container>

        {hasMenu && <Menu
            open={menuOpen}
            targetRef={itemRef}
            direction={direction}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onClose={onClose}
            isSubmenu
        >
            {children}
        </Menu>}
    </>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
InputOption.propTypes = {
    className   : PropTypes.string,
    icon        : PropTypes.string,
    content     : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    description : PropTypes.string,
    isSelected  : PropTypes.bool,
    hasChecks   : PropTypes.bool,
    isChecked   : PropTypes.bool,
    onMouseDown : PropTypes.func,
    direction   : PropTypes.string,
    onClose     : PropTypes.func,
    children    : PropTypes.any,
};


/**
 * The Default Properties
 * @type {object} defaultProps
 */
InputOption.defaultProps = {
    direction : "right",
};

export default InputOption;
