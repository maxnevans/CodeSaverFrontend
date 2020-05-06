import React, { PureComponent } from "react";
import DataSourceText from "./DataSourceText";
import DataSourceFile from "./DataSourceFile";

class DataSource extends PureComponent {
    static SOURCE_FILES = 'files';
    static SOURCE_TEXT = 'text';

    constructor(props) {
        super(props);

        this.state = {
            isFilesMode: false,
            fileNames: []
        };

        this.codeDragEnterHandler = this.codeDragEnterHandler.bind(this);
        this.codeDragLeaveHandler = this.codeDragLeaveHandler.bind(this);
        this.codeDropHandler = this.codeDropHandler.bind(this);
        this.codeTextChangeHandler = this.codeTextChangeHandler.bind(this);
        this.codeDragOverHandler = this.codeDragOverHandler.bind(this);
    }

    codeDragEnterHandler(event) {
        this.setState({isFilesMode: true});
        event.preventDefault();
    }

    codeDragLeaveHandler(event) {
        this.setState({isFilesMode: false});
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

        this.props.onSourceChange(DataSource.SOURCE_FILES, files);
    }

    codeTextChangeHandler(sourceText) {
        this.props.onSourceChange(DataSource.SOURCE_TEXT, sourceText);
    }

    codeDragOverHandler(event) {
        event.preventDefault();
    }

    #getSource(isFilesMode) {
        if (isFilesMode)
            return <DataSourceFile fileNames={this.state.fileNames} />;                

        return <DataSourceText code={this.props.data} onCodeChange={this.codeTextChangeHandler} />;
    }

    render() {
        const codeDisplayElement = this.#getSource(this.state.isFilesMode);
        const codeSourceWrong = this.props.isWrong ? 'code-source-wrong' : '';

        return (
            <div 
                className={"code-source " + codeSourceWrong} 
                onDragEnter={this.codeDragEnterHandler} 
                onDragLeave={this.codeDragLeaveHandler} 
                onDrop={this.codeDropHandler} 
                onDragOver={this.codeDragOverHandler} >
                {codeDisplayElement}
            </div>
        );
    }
}

export default DataSource;