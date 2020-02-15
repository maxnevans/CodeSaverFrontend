import React, { Component } from "react";
import CodeSourceText from "./CodeSourceText";
import CodeSourceFile from "./CodeSourceFile";

class CodeSource extends Component {
    static SOURCE_FILES = 'files';
    static SOURCE_TEXT = 'text';

    constructor(props) {
        super(props);

        this.state = {
            isFiles: false,
            fileNames: []
        };

        this.codeDragEnterHandler = this.codeDragEnterHandler.bind(this);
        this.codeDragLeaveHandler = this.codeDragLeaveHandler.bind(this);
        this.codeDropHandler = this.codeDropHandler.bind(this);
        this.codeTextChangeHandler = this.codeTextChangeHandler.bind(this);
        this.codeDragOverHandler = this.codeDragOverHandler.bind(this);
    }

    codeDragEnterHandler(event) {
        this.setState({isFiles: true});
        event.preventDefault();
    }

    codeDragLeaveHandler(event) {
        this.setState({isFiles: false});
        event.preventDefault();
    }

    codeDropHandler(event) {
        event.persist();
        event.preventDefault();

        const files = event.dataTransfer.files;

        Array.from(files).forEach(file => {

            // Not handling multiple files
            //const fileNames = this.state.fileNames.slice();

            // Handling single file with replace of old
            const fileNames = [];

            fileNames.push(file.name);

            this.setState({fileNames});
        });

        this.props.onSourceChange(CodeSource.SOURCE_FILES, files);
    }

    codeTextChangeHandler(sourceText) {
        this.props.onSourceChange(CodeSource.SOURCE_TEXT, sourceText);
    }

    codeDragOverHandler(event) {
        event.preventDefault();
    }

    render() {
        const codeDisplayElement = this.state.isFiles 
            ? <CodeSourceFile fileNames={this.state.fileNames} /> 
            : <CodeSourceText code={this.props.code} onCodeChange={this.codeTextChangeHandler} />;

        const codeSourceWrong = this.props.isWrong ? 'code-source-wrong' : '';

        return (
            <div className={"code-source " + codeSourceWrong} onDragEnter={this.codeDragEnterHandler} 
                onDragLeave={this.codeDragLeaveHandler} onDrop={this.codeDropHandler} onDragOver={this.codeDragOverHandler}>
                {codeDisplayElement}
            </div>
        );
    }
}

export default CodeSource;