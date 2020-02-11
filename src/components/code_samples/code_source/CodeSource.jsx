import React, { Component } from "react";
import CodeSourceText from "./CodeSourceText";
import CodeSourceFile from "./CodeSourceFile";

class CodeSource extends Component {
    static SOURCE_FILES = 'files';
    static SOURCE_TEXT = 'text';

    constructor(props) {
        super(props);

        this.state = {
            isFiles: false
        };

        this.codeDragEnterHandler = this.codeDragEnterHandler.bind(this);
        this.codeDragLeaveHandler = this.codeDragLeaveHandler.bind(this);
        this.codeDropHandler = this.codeDropHandler.bind(this);
        this.codeTextChangeHandler = this.codeTextChangeHandler.bind(this);
    }

    codeDragEnterHandler(event) {
        this.setState({isFiles: true});
    }

    codeDragLeaveHandler(event) {
        if (this.files == null) {
            this.setState({isFiles: false});
        }
    }

    codeDropHandler(event) {
        const files = event.dataTransfer.files;

        console.log(files);

        this.props.onSourceChange(CodeSource.SOURCE_FILES, files);
    }

    codeTextChangeHandler(sourceText) {
        this.props.onSourceChange(CodeSource.SOURCE_TEXT, sourceText);
    }

    render() {
        const codeDisplayElement = this.state.isFiles ? 
            <CodeSourceFile /> : <CodeSourceText code={this.props.code} onCodeChange={this.codeTextChangeHandler} />;

        return (
            <div className="code-source" onDragEnter={this.codeDragEnterHandler} 
                onDragLeave={this.codeDragLeaveHandler} onDrop={this.codeDropHandler}>
                {codeDisplayElement}
            </div>
        );
    }
}

export default CodeSource;