import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Core & Utils
import NLS                  from "../../Core/NLS";
import Href                 from "../../Core/Href";
import KeyCode              from "../../Utils/KeyCode";

// Components
import Drawer               from "../Drawer/Drawer";
import MenuLink             from "../Link/MenuLink";
import InputField           from "../Form/InputField";



// Styles
const H3 = Styled.h3`
    box-sizing: border-box;
    height: 40px;
    margin: 0;
    padding-top: 16px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--title-color);
`;

const Results = Styled.div`
    height: calc(var(--full-height) - 140px);
    overflow: auto;

    .link-preicon {
        font-size: 1.8em;
        margin-right: 0;
    }
    .link-content {
        margin-left: 8px;
    }
`;

const Name = Styled.span`
    display: block;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 1px;
`;
const Title = Styled.span`
    display: block;
    font-size: 12px;
`;



/**
 * The Search Drawer
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function SearchDrawer(props) {
    const {
        isHidden, open, className, message, fetch, onClose,
        logo, logoWidth, logoHeight,
    } = props;

    const [ timer,       setTimer       ] = React.useState(null);
    const [ value,       setValue       ] = React.useState("");
    const [ suggestions, setSuggestions ] = React.useState([]);
    const [ selected,    setSelected    ] = React.useState(0);

    // Handles the Input Change
    const handleChange = (name, value) => {
        setValue(value);
        if (timer) {
            window.clearTimeout(timer);
        }
        if (value.length > 1) {
            const newTimer = window.setTimeout(async () => {
                const response = await fetch({ value });
                setSuggestions(response);
            }, 500);
            setTimer(newTimer);
        } else {
            setSuggestions([]);
            setTimer(null);
        }
    };

    // Handles the Key Input
    const handleKey = (e) => {
        let newSelected = selected;
        if (!suggestions.length) {
            return;
        }

        let handled = true;
        switch (e.keyCode) {
        case KeyCode.DOM_VK_DOWN:
            newSelected += 1;
            break;
        case KeyCode.DOM_VK_UP:
            newSelected -= 1;
            break;
        case KeyCode.DOM_VK_RETURN:
            handleClick(selected);
            handled = false;
            break;
        default:
            handled = false;
        }
        if (!handled) {
            return;
        }

        if (newSelected < 0) {
            newSelected = suggestions.length - 1;
        } else if (newSelected > suggestions.length - 1) {
            newSelected = 0;
        }

        const elem = document.querySelector(`.drawer-results a:nth-child(${newSelected + 1})`);
        if (elem) {
            elem.scrollIntoView({
                behavior : "auto",
                block    : "center",
                inline   : "nearest",
            });
        }
        setSelected(newSelected);
        e.preventDefault();
    };

    // Handles the Results Click
    const handleClick = (selected) => {
        const elem = suggestions[selected];
        setSelected(selected);
        Href.goto(elem.url, elem.id);
        onClose();
    };


    if (isHidden) {
        return <React.Fragment />;
    }
    return <Drawer
        open={open}
        className={className}
        message={message || "GENERAL_SEARCH"}
        onClose={onClose}
        logo={logo}
        logoWidth={logoWidth}
        logoHeight={logoHeight}
    >
        <InputField
            name="search"
            placeholder="GENERAL_SEARCH_ONE"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKey}
            noMargin
            autoFocus
        />
        {suggestions.length > 0 && <section>
            <H3>{NLS.get("GENERAL_SEARCH_RESULTS")}</H3>
            <Results className="drawer-results">
                {suggestions.map((elem, index) => <MenuLink
                    key={index}
                    variant="light"
                    icon={elem.type}
                    isSelected={selected === index}
                    onClick={() => handleClick(index)}
                >
                    <Name>{NLS.get(elem.name)}</Name>
                    <Title>{elem.title}</Title>
                </MenuLink>)}
            </Results>
        </section>}
    </Drawer>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
SearchDrawer.propTypes = {
    isHidden   : PropTypes.bool,
    open       : PropTypes.bool.isRequired,
    className  : PropTypes.string,
    message    : PropTypes.string,
    fetch      : PropTypes.func.isRequired,
    onClose    : PropTypes.func.isRequired,
    logo       : PropTypes.string,
    logoWidth  : PropTypes.number,
    logoHeight : PropTypes.number,
};

/**
 * The Default Properties
 * @type {Object} defaultProps
 */
SearchDrawer.defaultProps = {
    isHidden  : false,
    className : "",
};

export default SearchDrawer;
