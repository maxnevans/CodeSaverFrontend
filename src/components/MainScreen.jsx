import React, { Component } from 'react';
import List from './code_samples/List';
import App from './App';
import CodeSampleCreator from './code_samples/CodeSampleCreator';

class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.editCodeSampleHandler = this.editCodeSampleHandler.bind(this);
    }

    editCodeSampleHandler(sampleId) {
        const dataForNextScreen = {sampleId};

        this.props.onGoForward(App.EDIT_SCREEN, dataForNextScreen);
    }

    render() {
        return (
            <div className="main-screen">
                <CodeSampleCreator />
                <List onEdit={this.editCodeSampleHandler } />   
            </div>
        );
    }
}

export default MainScreen;