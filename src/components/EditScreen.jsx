import React, { Component } from 'react';
import CodeSampleCreator from './code_samples/CodeSampleCreator';
import App from './App';
import coreApp from '../core/app';
import CodeSource from './code_samples/code_source/CodeSource';

class EditScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: {
                name: '',
                edited_time: '',
                created_time: '',
                type: CodeSource.SOURCE_TEXT,
                data: ''
            }
        };
        this.goBackClickHandler = this.goBackClickHandler.bind(this);
        this.codeSaveHandler = this.codeSaveHandler.bind(this);
        this.codeChangeHandler = this.codeChangeHandler.bind(this);
    }

    
    goBackClickHandler(event) {
        this.props.onGoBack();
    }

    codeChangeHandler(code) {
        this.setState(state => {
            return {
                code: {
                    ...state.code,
                    ...code
                }
            };
        })
    }

    codeSaveHandler() {
        const code = this.state.code;

        if (code.type == CodeSource.SOURCE_TEXT) {
            coreApp.editCodeSample(code.id, code.name, code.data)
                .then(res => this.props.onGoForward(App.MAIN_SCREEN, null, true))
                .catch(err => console.log(err));

            return;
        }

        if (code.type == CodeSource.SOURCE_FILES) {
            const file = code.data[0];

            coreApp.uploadEditCodeSample(code.id, code.name, file)
                .then(res => this.props.onGoForward(App.MAIN_SCREEN, null, true))
                .catch(err => console.log(err));

            return;
        }
    }

    componentDidMount() {
        coreApp.getCodeSample(this.props.screenData.sampleId)
            .then(code => this.setState({code: this.convertCode(code)}))
            .catch(err => console.log(err));
    }

    convertCode(dbCode) {
        return {
            ...dbCode,
            type: CodeSource.SOURCE_TEXT,
            data: dbCode.code
        };
    }

    render() {
        return (
            <div className="edit-screen">
                <button onClick={this.goBackClickHandler} >Back</button>
                <CodeSampleCreator onChange={this.codeChangeHandler} code={this.state.code} onSave={this.codeSaveHandler}/>
            </div>
        );
    }
}

export default EditScreen;