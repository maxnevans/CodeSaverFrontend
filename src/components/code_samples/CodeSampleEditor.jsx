import React, { Component } from "react";

class CodeSampleEditor extends Component {
    static defaultProps = {
        codeName: '<name not provided>',
        codeEdited: '<time not provided>',
        codeCreated: '<time not provided>',
        codeText: '<code not provided>'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="code-editor">
                <div className="code-name">{this.props.codeName}</div>
                <div className="code-edited">{this.props.codeEdited}</div>
                <div className="code-created">{this.props.codeCreated}</div>
                <div className="code-text">{this.props.codeText}</div>
            </div>
        );
    }
}

export default CodeSampleEditor;