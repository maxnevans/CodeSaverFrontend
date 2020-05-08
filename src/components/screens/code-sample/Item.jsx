import React, { PureComponent } from "react";
import { EDIT_SCREEN } from "../../ScreenType";
import PropTypes from "prop-types";

export default class Item extends PureComponent {
    static propTypes = {
        pushScreen: PropTypes.func.isRequired,
        editCodeSample: PropTypes.func.isRequired,
        deleteCodeSample: PropTypes.func.isRequired,
        codeSample: PropTypes.object.isRequired,
        user: PropTypes.object,
    };
    
    constructor(props) {
        super(props);

        this.onViewCodeClick = this.onViewCodeClick.bind(this);
        this.onDeleteCodeClick = this.onDeleteCodeClick.bind(this);
    }

    onViewCodeClick() {
        this.props.pushScreen(EDIT_SCREEN);
        this.props.editCodeSample(this.props.codeSample);
    }

    onDeleteCodeClick() {
        this.props.deleteCodeSample(this.props.codeSample);
    }

    render() {
        const deleteButton = this.props.codeSample.author.id === this.props.user?.id ? <button onClick={this.onDeleteCodeClick}>Delete</button> : null;
        const editTime = this.props.codeSample.editedTime ? <div className="code-edited">{new Date(this.props.codeSample.editedTime).toUTCString()}</div> : null;
        return (
            <div className="code-list-item">
                <div className="code-name">{this.props.codeSample.name ?? "<undefined>"}</div>
                {editTime}
                <div className="code-created">{new Date(this.props.codeSample.createdTime ?? 0).toUTCString()}</div>
                <button onClick={this.onViewCodeClick}>Show</button>
                {deleteButton}
            </div>
        );
    }
}