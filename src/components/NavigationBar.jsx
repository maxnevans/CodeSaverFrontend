import React, {PureComponent} from "react";

export default class NavigationBar extends PureComponent {
    constructor(props) {
        super(props);

        this.onBackClick = this.onBackClick.bind(this);
    }

    onBackClick() {
        this.props.popScreen();
    }

    render() {
        const backButton = this.props.stack.length > 1 ? <button onClick={onBackClick}></button> : null;
        return (<div className="navigation-bar">
                    {backButton}
                </div>);
    }
}