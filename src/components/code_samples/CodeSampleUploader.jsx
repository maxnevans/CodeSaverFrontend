import React, { Component } from "react";
import coreApp from "../../core/app";

class CodeSampleUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {codeName : ""};
        this.fileInput = React.createRef();
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleCodeNameChange = this.handleCodeNameChange.bind(this);
    }

    handleCodeNameChange(event) {
        this.setState({codeName: event.target.value});
    }

    handleUploadFile(event) {
        event.preventDefault();

        const codeName = this.state.codeName;
        const codeFile = this.fileInput.current.files[0];

        coreApp.uploadCreateCodeSample(codeName, codeFile)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="code-sample-uploader">
                <input type="text" name="code-name" onChange={this.handleCodeNameChange} value={this.state.codeName}/>
                <input type="file" ref={this.fileInput}/>
                <input type="submit" onClick={this.handleUploadFile} />
            </div>
        );
    }
}

export default CodeSampleUploader;