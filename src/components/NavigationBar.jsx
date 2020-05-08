import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class NavigationBar extends PureComponent {
    static propTypes ={
        popScreen: PropTypes.func.isRequired,
        stack: PropTypes.arrayOf(PropTypes.object),
    };

    constructor(props) {
        super(props);

        this.onBackClick = this.onBackClick.bind(this);
    }

    onBackClick() {
        this.props.popScreen();
    }

    render() {
        const hidden = this.props.stack.length <= 1;
        const backButton = this.props.stack.length > 1 ? <button onClick={this.onBackClick} className="back-button">Back</button> : null;
        return (
            <div className={"navigation-bar" + (hidden ? "hidden" : "")}>
                {backButton}
            </div>
        );
    }
}