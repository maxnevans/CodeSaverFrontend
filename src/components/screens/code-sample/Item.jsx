import React, { PureComponent } from "react";
import { EDIT_SCREEN } from "../../ScreenType";

class CodeSampleListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.onEditCodeClick = this.onEditCodeClick.bind(this);
        this.onDeleteCodeClick = this.onDeleteCodeClick.bind(this);
    }

    onEditCodeClick() {
        this.props.pushScreen(EDIT_SCREEN);
        this.props.editCodeSample(this.props.codeSample);
    }

    onDeleteCodeClick() {
        this.props.deleteCodeSample(this.props.codeSample);
    }

    render() {
        return (
            <div className="code-list-item">
                <div className="code-name">{this.props.codeSample.name ?? "<undefined>"}</div>
                <div className="code-edited">{this.props.codeSample.editedTime ?? null}</div>
                <div className="code-created">{this.props.codeSample.createdTime ?? "<undefined>"}</div>
                <button onClick={this.onEditCodeClick}>Edit</button>
                <button onClick={this.onDeleteCodeClick}>Delete</button>
            </div>
        );
    }
}

export default CodeSampleListItem;