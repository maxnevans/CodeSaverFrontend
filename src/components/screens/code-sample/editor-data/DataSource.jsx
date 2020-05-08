import React, { PureComponent } from "react";
import DataSourceText from "./DataSourceText";
import DataSourceFile from "./DataSourceFile";
import PropTypes from "prop-types";

class DataSource extends PureComponent {
    static propTypes = {
        onSourceChange: PropTypes.func.isRequired,
        data: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.instanceOf(File)),
        ]).isRequired,
        isWrong: PropTypes.bool.isRequired,
        dataType: PropTypes.string.isRequired,
        disabled: PropTypes.bool.isRequired,
    };
    
    static SOURCE_FILES = 'files';
    static SOURCE_TEXT = 'text';

    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            fileNames: []
        };

        this.codeDragEnterHandler = this.codeDragEnterHandler.bind(this);
        this.codeDragLeaveHandler = this.codeDragLeaveHandler.bind(this);
        this.codeDropHandler = this.codeDropHandler.bind(this);
        this.codeTextChangeHandler = this.codeTextChangeHandler.bind(this);
        this.codeDragOverHandler = this.codeDragOverHandler.bind(this);
    }

    codeDragEnterHandler(event) {
        event.preventDefault();

        if (this.props.disabled)
            return;

        this.setState({isDragging: true});
    }

    codeDragLeaveHandler(event) {
        event.preventDefault();

        if (this.props.disabled)
            return;

        this.setState({isDragging: false});
    }

    codeDropHandler(event) {
        event.persist();
        event.preventDefault();

        if (this.props.disabled)
            return;

        this.setState({isDragging: false});

        let files = [...event.dataTransfer.files];

        if (Array.isArray(this.props.data))
            files = this.props.data.concat?.(files);

        this.setState({fileNames: files.map(file => file.name)});

        this.props.onSourceChange(DataSource.SOURCE_FILES, files);
    }

    codeTextChangeHandler(sourceText) {
        this.props.onSourceChange(DataSource.SOURCE_TEXT, sourceText);
    }

    codeDragOverHandler(event) {
        event.preventDefault();
    }

    _getSource(isFilesMode) {
        if (isFilesMode)
            return <DataSourceFile disabled={this.props.disabled} fileNames={this.state.fileNames} />;                

        return <DataSourceText disabled={this.props.disabled} code={this.props.data} onCodeChange={this.codeTextChangeHandler} />;
    }

    render() {
        const codeDisplayElement = this._getSource(this.state.isDragging || this.props.dataType == DataSource.SOURCE_FILES);
        const codeSourceWrong = this.props.isWrong ? 'input-wrong' : '';

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