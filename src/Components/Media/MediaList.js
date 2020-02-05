import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import NoneAvailable        from "../Common/NoneAvailable";
import CircularLoader       from "../Loader/CircularLoader";
import MediaItem            from "../Media/MediaItem";



// Styles
const Div = Styled.div.attrs(({ withSpacing }) => ({ withSpacing }))`
    margin-top: 24px;
    ${(props) => props.withSpacing && `
        padding: 24px;
        min-height: calc(131px * 2 + 8px);
    `}
`;

const Section = Styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 8px;
`;



/**
 * The Media List Component
 * @param {Object} props
 * @returns {React.ReactElement}
 */
function MediaList(props) {
    const { className, onAction, isLoading, canEdit, canSelect, withSpacing, selected, items } = props;
    
    const showLoader = isLoading;
    const showNone   = Boolean(!isLoading && !items.length);
    const showItems  = Boolean(!isLoading && items.length);

    return <Div className={className} withSpacing={withSpacing}>
        {showLoader && <CircularLoader />}
        {showNone   && <NoneAvailable message="MEDIA_NONE_AVAILABLE" />}
        {showItems  && <Section>
            {items.map((elem, index) => <MediaItem
                key={index}
                elem={elem}
                isSelected={canSelect && selected === elem.name}
                hasActions={canEdit && !elem.isBack}
                onAction={onAction}
            />)}
        </Section>}
    </Div>;
}

/**
 * The Property Types
 * @type {Object} propTypes
 */
MediaList.propTypes = {
    className   : PropTypes.string,
    onAction    : PropTypes.func,
    isLoading   : PropTypes.bool,
    canSelect   : PropTypes.bool,
    canEdit     : PropTypes.bool,
    withSpacing : PropTypes.bool,
    selected    : PropTypes.string,
    items       : PropTypes.array,
};

/**
 * The Default Properties
 * @typedef {Object} defaultProps
 */
MediaList.defaultProps = {
    className   : "",
    isLoading   : false,
    canSelect   : false,
    canEdit     : false,
    withSpacing : false,
};

export default MediaList;
