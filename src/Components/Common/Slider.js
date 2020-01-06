import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import Video                from "./Video";



// Styles
const Section = Styled.section`
    --slider-box: 40px;
    --slider-bottom: 40px;
    --slider-gap: 18px;
    --slider-dot-gap: 5px;
    --slider-arrow-width: 36px;
    --slider-arrow-gap: 16px;

    position: relative;
    overflow: hidden;

    &:hover .slider-nav button,
    &:hover .slider-dots {
        opacity: 1;
    }
`;

const Div = Styled.div`
    position: relative;
    width: 400%;
    display: flex;
    transition: transform ease-in-out 0.5s;
`;

const Img = Styled.img`
    display: block;
    max-width: 100%;
    cursor: pointer;
`;

const Nav = Styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
`;

const Button = Styled.button`
    appearance: none;
    position: absolute;
    top: calc(50% - 40px);
    width: 60px;
    height: 80px;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    pointer-events: all;
    outline: none;
    opacity: 0;
    z-index: 1;
    
    :hover button {
        opacity: 1;
    }

    &::before,
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        width: var(--slider-arrow-width);
        height: 2px;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        transition: all 0.2s;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }
    &:active::before {
        transform: rotate(35deg);
    }
    &:active::after {
        transform: rotate(-35deg);
    }
`;

const Prev = Styled(Button)`
    left: 0;
    &::before,
    &::after {
        left: var(--slider-arrow-gap);
        transform-origin: left center;
    }
`;

const Next = Styled(Button)`
    right: 0;
    &::before,
    &::after {
        right: var(--slider-arrow-gap);
        transform-origin: right center;
    }
`;

const Dots = Styled.ul`
    position: absolute;
    bottom: var(--slider-bottom);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    opacity: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 2;
`;

const Dot = Styled.button.attrs(({ isActive }) => ({ isActive }))`
    background-color: ${(props) => props.isActive ? "white" : "transparent"};
    appearance: none;
    display: block;
    height: var(--slider-box);
    width: var(--slider-box);
    padding: 0;
    margin: 2px var(--slider-dot-gap);
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
    overflow: hidden;
    text-indent: 100%;
    cursor: pointer;
    outline: none;
    transition: all 0.5s;

    &:hover {
        background-color: rgb(0, 0, 0);
    }
`;


    
/**
 * The Slider Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function Slider(props) {
    const { variant, data, className, height, withDots, autoSlide, time, onClick, onSlide } = props;

    // The State
    const [ timer, setTimer ] = React.useState(null);
    const [ index, setIndex ] = React.useState(0);

    // Moves the Slider to the given Index
    const gotoIndex = (index) => {
        if (timer) {
            window.clearTimeout(timer);
        }
        let newIndex = index;
        if (index < 0) {
            newIndex = data.length - 1;
        } else if (index > data.length - 1) {
            newIndex = 0;
        }
        setIndex(newIndex);
        if (onSlide) {
            onSlide(newIndex);
        }
        if (autoSlide) {
            setTimer(window.setTimeout(() => gotoDir(1), time * 1000));
        }
    };

    // Moves the Slider to the given Direction
    const gotoDir = (direction) => {
        gotoIndex(index + direction);
    };

    // Start the Slider
    if (autoSlide) {
        React.useEffect(() => {
            if (timer) {
                window.clearTimeout(timer);
            }
            setTimer(window.setTimeout(() => gotoDir(1), time * 1000));
            return () => {
                if (timer) {
                    window.clearTimeout(timer);
                }
            };
        }, []);
    }


    const dots     = Utils.createArrayOf(data.length);
    const showNav  = data.length > 1;
    const showDots = withDots && data.length > 1;
    const slStyle  = { width : `calc(100% / ${data.length})` };
    const cntStyle = {
        height    : height ? `${height}px` : "inherit",
        width     : `calc(100% * ${data.length})`,
        transform : `translateX(calc(-100%/${data.length}*${index}))`,
    };

    return <Section className={`slider ${className}`}>
        <Div className="slider-content" style={cntStyle}>
            {Object.entries(data).map(([ type, elem ]) => (
                <div key={type} style={slStyle}>
                    {variant === "image" && <Img
                        alt={elem.name}
                        src={elem.source}
                        onClick={onClick(elem)}
                    />}
                    {variant === "video" && <Video
                        title={elem.name}
                        source={elem.source}
                    />}
                </div>
            ))}
        </Div>

        {showNav && <Nav className="slider-nav">
            <Prev onClick={() => gotoDir(-1)} />
            <Next onClick={() => gotoDir(1)}  />
        </Nav>}

        {showDots && <Dots className="slider-dots">
            {dots.map((elem) => <li key={elem}>
                <Dot
                    isActive={index === elem - 1}
                    onClick={() => gotoIndex(elem - 1)}
                >
                    {elem}
                </Dot>
            </li>)}
        </Dots>}
    </Section>;
}

/**
 * The Property Types
 * @typedef {Object} propTypes
 */
Slider.propTypes = {
    className : PropTypes.string,
    variant   : PropTypes.string,
    data      : PropTypes.array.isRequired,
    onClick   : PropTypes.func,
    onSlide   : PropTypes.func,
    height    : PropTypes.number,
    index     : PropTypes.number,
    autoSlide : PropTypes.bool,
    withDots  : PropTypes.bool,
    time      : PropTypes.number,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
Slider.defaultProps = {
    onClick   : (() => {}),
    variant   : "image",
    className : "",
    height    : 0,
    index     : 0,
    autoSlide : false,
    withDots  : false,
    time      : 5,
};

export default Slider;
