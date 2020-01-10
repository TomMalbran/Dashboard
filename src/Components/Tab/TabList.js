import React                from "react";
import PropTypes            from "prop-types";
import Action               from "Utils/Common/Action";
import Utils                from "Utils/Common/Utils";

// Components
import HyperLink            from "dashboard/dist/Components/HyperLink";

// Styles
import "Styles/Components/Utils/Tabs.css";



/**
 * The Tab List
 */
class TabList extends React.Component {
    /**
     * Creates the Children
     * @returns {React.ReactElement[]}
     */
    getChildren() {
        const { value, onClick } = this.props;

        const childs   = Utils.toArray(this.props.children);
        const children = [];
        let   key      = 0;

        for (const child of childs) {
            if (!child.props.isHidden) {
                const clone = React.cloneElement(child, {
                    key, onClick,
                    index      : key,
                    isSelected : child.props.value ? child.props.value === value : key === value,
                });
                children.push(clone);
                key += 1;
            }
        }
        return children;
    }

    /**
     * Do the Render
     * @returns {Object}
     */
    render() {
        const { variant, onClick, showAdd } = this.props;

        const iconVariant = variant === "dialog" ? "icon-dark" : "icon-light";

        return <div className={`tabs-container tabs-${variant}`}>
            <div className="tabs-content">
                {this.getChildren()}
            </div>
            {!!showAdd && <HyperLink
                className="tabs-add"
                variant={iconVariant}
                icon="add"
                onClick={() => onClick(Action.ADD)}
            />}
        </div>;
    }



    /**
     * The Property Types
     * @type {Object} propTypes
     */
    static propTypes = {
        variant  : PropTypes.string.isRequired,
        value    : PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
        onClick  : PropTypes.func.isRequired,
        showAdd  : PropTypes.bool,
        children : PropTypes.any,
    }
}

export default TabList;
