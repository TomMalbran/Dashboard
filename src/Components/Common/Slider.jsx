import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Utils
import Utils                from "../../Utils/Utils";

// Components
import Video                from "../Common/Video";

// Variants
const Variant = {
    IMAGE : "image",
    VIDEO : "video",
};



// Styles
const Container = Styled.section`
    --slider-gap: 18px;
    --slider-dot-bottom: 16px;
    --slider-dot-size: 16px;
    --slider-dot-gap: 8px;
    --slider-arrow-width: 16px;
    --slider-arrow-gap: 16px;
    --slider-border-radius: var(--border-radius);

    position: relative;
    border-radius: var(--slider-border-radius);
    touch-action: none;
    overflow: hidden;

    &:hover .slider-arrows button,
    &:hover .slider-dots {
        opacity: 1;
    }
`;

const Content = Styled.div`
    position: relative;
    width: 400%;
    display: flex;
    transition: transform ease-in-out 0.5s;
`;

const Image = Styled.img`
    display: block;
    max-width: 100%;
    cursor: pointer;
`;

const Arrows = Styled.nav`
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
    top: calc(50% - var(--slider-arrow-width) * 2);
    width: calc(var(--slider-arrow-width) * 2 + var(--slider-arrow-gap));
    height: calc(var(--slider-arrow-width) * 4);
    padding: 0;
    border: none;
    background-color: transparent;
    pointer-events: all;
    outline: none;
    opacity: 0;
    z-index: 1;
    cursor: pointer;

    &::before,
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        width: var(--slider-arrow-width);
        height: 2px;
        background-color: var(--white-color);
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

const Dots = Styled.ul.attrs(({ showAlways }) => ({ showAlways }))`
    position: absolute;
    bottom: var(--slider-dot-bottom);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--slider-dot-gap);
    opacity: ${(props) => props.showAlways ? 1 : 0};
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 2;
`;

const Dot = Styled.button.attrs(({ isActive }) => ({ isActive }))`
    background-color: ${(props) => props.isActive ? "white" : "rgba(0, 0, 0, 0.7)"};
    appearance: none;
    display: block;
    height: var(--slider-dot-size);
    width: var(--slider-dot-size);
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 100%;
    overflow: hidden;
    text-indent: 100%;
    outline: none;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
        background-color: rgb(0, 0, 0);
    }
`;



/**
 * The Slider Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Slider(props) {
    const {
        variant, data, className, height, withArrows, withDots, alwaysDots,
        autoSlide, time, onClick, onSlide,
    } = props;


    // The Current State
    const [ update,     setUpdate     ] = React.useState(0);
    const [ timer,      setTimer      ] = React.useState(null);
    const [ index,      setIndex      ] = React.useState(0);
    const [ touchStart, setTouchStart ] = React.useState(0);
    const [ touchDiff,  setTouchDiff  ] = React.useState(0);


    // Start the Slider
    React.useEffect(() => {
        if (timer) {
            window.clearTimeout(timer);
        }
        if (autoSlide) {
            setTimer(window.setTimeout(() => gotoDir(1), time * 1000));
        }
        return () => {
            if (timer) {
                window.clearTimeout(timer);
            }
        };
    }, [ autoSlide, update ]);

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
            setUpdate(update + 1);
        }
    };

    // Moves the Slider to the given Direction
    const gotoDir = (direction) => {
        gotoIndex(index + direction);
    };


    // Handle the Touch Start
    const handleTouchStart = (e) => {
        if (data.length > 1) {
            setTouchStart(e.touches[0].clientX);
        }
    };

    // Handle the Touch Move
    const handleTouchMove = (e) => {
        if (data.length > 1) {
            setTouchDiff(e.touches[0].clientX - touchStart);
        }
    };

    // Handle the Touch End
    const handleTouchEnd = () => {
        if (data.length === 1) {
            return;
        }

        setTouchStart(0);
        setTouchDiff(0);
        if (Math.abs(touchDiff) < 50) {
            if (onClick && data[index]) {
                onClick(data[index]);
            }
        } else if (touchDiff < 0 && index < data.length - 1) {
            gotoDir(1);
        } else if (touchDiff > 0 && index > 0) {
            gotoDir(-1);
        }
    };


    // Variables
    const dots       = Utils.createArrayOf(data.length, 0);
    const showArrows = Boolean(withArrows && data.length > 1);
    const showDots   = Boolean(withDots && data.length > 1);
    const slStyle    = { width : `calc(100% / ${data.length})` };
    const cntStyle   = {
        height     : height ? `${height}px` : "inherit",
        width      : `calc(100% * ${data.length})`,
        transform  : `translateX(calc(-100% / ${data.length} * ${index} + ${touchDiff}px))`,
        transition : touchDiff ? "none" : "transform ease-in-out 0.5s",
    };


    // Do the Render
    return <Container
        className={`slider ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
        <Content className="slider-content" style={cntStyle}>
            {Object.entries(data).map(([ type, elem ]) => (
                <div key={type} style={slStyle}>
                    {variant === Variant.IMAGE && <Image
                        alt={elem.name}
                        src={elem.source}
                        onClick={() => onClick(elem)}
                    />}
                    {variant === Variant.VIDEO && <Video
                        title={elem.name}
                        source={elem.source}
                    />}
                </div>
            ))}
        </Content>

        {showArrows && <Arrows className="slider-arrows">
            <Prev onClick={() => gotoDir(-1)} />
            <Next onClick={() => gotoDir(1)}  />
        </Arrows>}

        {showDots && <Dots className="slider-dots" showAlways={alwaysDots}>
            {dots.map((elem) => <li key={elem}>
                <Dot
                    isActive={Number(index) === Number(elem)}
                    onClick={() => gotoIndex(elem)}
                >
                    {elem + 1}
                </Dot>
            </li>)}
        </Dots>}
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Slider.propTypes = {
    className  : PropTypes.string,
    variant    : PropTypes.string,
    data       : PropTypes.array.isRequired,
    onClick    : PropTypes.func,
    onSlide    : PropTypes.func,
    height     : PropTypes.number,
    index      : PropTypes.number,
    withArrows : PropTypes.bool,
    withDots   : PropTypes.bool,
    alwaysDots : PropTypes.bool,
    autoSlide  : PropTypes.bool,
    time       : PropTypes.number,
};

/**
 * The Default Properties
 * @type {object} defaultProps
 */
Slider.defaultProps = {
    onClick    : (() => {}),
    variant    : Variant.IMAGE,
    className  : "",
    height     : 0,
    index      : 0,
    withArrows : false,
    withDots   : false,
    alwaysDots : false,
    autoSlide  : false,
    time       : 5,
};

export default Slider;
