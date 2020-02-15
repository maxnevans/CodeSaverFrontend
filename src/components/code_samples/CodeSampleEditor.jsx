import React, { Component } from "react";

class CodeSampleEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeName: '',
            codeText: '',
            isWrongName: false,
            isWrongCode: false,
        };
        this.codeChangeHandler = this.codeChangeHandler.bind(this);
        this.codeNameChangeHandler = this.codeNameChangeHandler.bind(this);
        this.saveCodeHandler = this.saveCodeHandler.bind(this);
    }

    codeNameChangeHandler(event) {
        const codeName = event.target.value;

        this.props.onChange({name: codeName});
    }

    codeChangeHandler(event) {
        const code = event.target.value;

        this.props.onChange({code: code});
    }

    saveCodeHandler() {
        this.props.onSave();
    }

    render() {
        

        return (
            <div className="code-editor">
                <input className="code-name" value={this.props.code.name} onChange={this.codeNameChangeHandler} />
                {editedItem}
                {createdTime}
                <textarea className="code-text" onChange={this.codeChangeHandler} value={this.props.code.code}></textarea>
                <button onClick={this.saveCodeHandler}>Save</button>
            </div>
        );
    }
}

export default CodeSampleEditor;