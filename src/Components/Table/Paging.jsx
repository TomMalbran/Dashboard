import React                from "react";
import PropTypes            from "prop-types";
import Styled               from "styled-components";

// Components
import PagingContent        from "./PagingContent";



// Styles
const Container = Styled.div`
    position: sticky;
    bottom: 0;
    min-height: 32px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 4px;
    font-size: 12px;
    background: var(--table-background);
    border-radius: var(--table-border-radius);
    box-shadow: 0 0 0 4px var(--content-color);
    z-index: 2;
`;



/**
 * The Paging Component
 * @param {object} props
 * @returns {React.ReactElement}
 */
function Paging(props) {
    const { sort, total, fetch } = props;


    // Do the Render
    return <Container>
        <PagingContent
            sort={sort}
            total={total}
            fetch={fetch}
        />
    </Container>;
}

/**
 * The Property Types
 * @type {object} propTypes
 */
Paging.propTypes = {
    fetch : PropTypes.func,
    sort  : PropTypes.object,
    total : PropTypes.number.isRequired,
};

export default Paging;
