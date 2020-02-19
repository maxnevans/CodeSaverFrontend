import React, { Component } from 'react';
import App from './App';
import CodeSampleCreator from './code_samples/CodeSampleCreator';
import List from './code_samples/List';
import coreApp from '../core/app';
import CodeSource from './code_samples/code_source/CodeSource';

class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeSamplesList: [],
            newCodeSample: {
                name: '',
                type: CodeSource.SOURCE_TEXT,
                data: ''
            }
        };

        this.codeEditHandler = this.codeEditHandler.bind(this);
        this.codeSaveHandler = this.codeSaveHandler.bind(this);
        this.codeDeleteHandler = this.codeDeleteHandler.bind(this);
        this.codeChangeHandler = this.codeChangeHandler.bind(this);
    }

    componentDidMount() {
        coreApp.getList()
            .then(list => this.setState({codeSamplesList: list.map(code => {
                return {...code, created_time: (new Date(code.created_time).toLocaleString())};
            })}))
            .catch(error => console.log(error));
    }

    codeEditHandler(sampleId) {
        const dataForNextScreen = {sampleId};

        this.props.onGoForward(App.EDIT_SCREEN, dataForNextScreen);
    }

    codeChangeHandler(code) {
        this.setState(state => {
            return {
                newCodeSample: {
                    ...state.newCodeSample,
                    ...code
                }
            };
        });
    }

    getCleanCodeNewSample() {
        return {
            name: '',
            type: CodeSource.SOURCE_TEXT,
            data: ''
        };
    }

    codeSaveHandler() {
        const code = this.state.newCodeSample;

        if (code.type == CodeSource.SOURCE_TEXT) {
            coreApp.createCodeSample(code.name, code.data)
                .then(res => this.setState(state => {
                    let list = state.codeSamplesList;

                    code.id = res.codeSampleId;
                    code.created_time = (new Date()).toLocaleString();

                    list.splice(0, 0, code);

                    return {
                        codeSamplesList: list,
                        newCodeSample: this.getCleanCodeNewSample()
                    };
                }))
                .catch(err => console.log(err));

            return;
        }

        if (code.type == CodeSource.SOURCE_FILES) {
            const file = code.data[0];

            coreApp.uploadCreateCodeSample(code.name, file)
                .then(res => this.setState(state => {
                    let list = state.codeSamplesList;

                    code.id = res.codeSampleId;
                    code.data = null;
                    code.created_time = (new Date()).toLocaleString();

                    list.push(code);

                    return {
                        codeSamplesList: list,
                        newCodeSample: this.getCleanCodeNewSample()
                    };
                }))
                .catch(err => console.log(err));

            return;
        }
    }

    codeDeleteHandler(sampleId) {
        coreApp.deleteCodeSample(sampleId)
            .then(() => this.setState(state => {
                let list = state.codeSamplesList.slice();
                list = list.filter(item => item.id != sampleId);
                return {codeSamplesList: list};
            }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="main-screen">
                <CodeSampleCreator code={this.state.newCodeSample} onChange={this.codeChangeHandler} onSave={this.codeSaveHandler}/>
                <List list={this.state.codeSamplesList} onDelete={this.codeDeleteHandler} onEdit={this.codeEditHandler } />
            </div>
        );
    }
}

export default MainScreen;