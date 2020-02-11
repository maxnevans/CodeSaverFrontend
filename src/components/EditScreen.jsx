import React, { Component } from 'react';
import CodeSampleEditor from './code_samples/CodeSampleEditor';
import App from './App';

class EditScreen extends Component {
    constructor(props) {
        super(props);

        this.goBackClickHandler = this.goBackClickHandler.bind(this);
        this.codeSaveHandler = this.codeSaveHandler.bind(this);
    }

    
    goBackClickHandler(event) {
        this.props.onGoBack();
    }

    codeSaveHandler() {
        this.props.onGoForward(App.MAIN_SCREEN, null, true);
    }

    render() {
        return (
            <div className="edit-screen">
                <button onClick={this.goBackClickHandler} >Back</button>
                <CodeSampleEditor codeId={this.props.screenData.sampleId} onSave={this.codeSaveHandler}/>
            </div>
        );
    }
}

export default EditScreen;