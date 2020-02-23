import React, { PureComponent } from 'react';
import CodeSampleEditor from '../code_samples/CodeSampleEditor';
import List from '../code_samples/List';
import coreApp from '../../core/app';
import CodeSource from '../code_samples/code_source/CodeSource';
import QueryHandler from '../../core/query-handler';
import HttpCodes from '../../core/http-codes';

class MainScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            codeSamplesRetrieved: false,
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

        this._getListResponseHandler = this.getGetListResponseHandler();
        this._deleteResponseHandler = this.getDeleteResponseHandler();
    }

    getGetListResponseHandler() {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled response: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            const codeSamples = body.map(code => ({
                ...code, 
                created_time: (new Date(code.created_time).toLocaleString()),
                edited_time: code.edited_time ? (new Date(code.edited_time).toLocaleString()) : null
            }));

            this.props.onCodeSamplesChange(codeSamples);

            this.setState({codeSamplesRetrieved: true});
        });

        qh.setupHandler(HttpCodes.UNAUTHORIZED, () => this.props.onUnauthorized());

        return qh;
    }

    getSaveCodeResponseHandler(code) {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled response: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            const codeSamples = this.props.codeSamples;

            let list = codeSamples.slice();

            code.id = body.codeSampleId;
            code.data = null;
            code.created_time = (new Date()).toLocaleString();

            list.splice(0, 0, code);


            this.onCodeSamplesChange(list);
            this.setState({newCodeSample: this.getCleanCodeNewSample()});
        });

        qh.setupHandler(HttpCodes.UNAUTHORIZED, () => this.props.onUnauthorized());

        return qh;
    }

    getDeleteResponseHandler() {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled response: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            let list = this.props.codeSamples.slice();
            list = list.filter(item => item.id != sampleId);
            this.props.onCodeSamplesChange(list);
        });
        
        qh.setupHandler(HttpCodes.UNAUTHORIZED, () => this.props.onUnauthorized());

        return qh;
    }

    componentDidMount() {
        coreApp.prepareToQuery(this._getListResponseHandler).getList();
    }

    componentDidUpdate() {
        if (!this.state.codeSamplesRetrieved || !this.props.user.login)
            coreApp.prepareToQuery(this._getListResponseHandler).getList();
    }

    codeEditHandler(sampleId) {
        this.props.onCodeSampleEdit(sampleId);
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
            coreApp.prepareToQuery(this.getSaveCodeResponseHandler(code)).createCodeSample(code.name, code.data);
            return;
        }

        if (code.type == CodeSource.SOURCE_FILES) {
            const file = code.data[0];
            coreApp.prepareToQuery(code).uploadCreateCodeSample(code.name, file);
            return;
        }
    }

    codeDeleteHandler(sampleId) {
        coreApp.prepareToQuery(this._deleteResponseHandler).deleteCodeSample(sampleId);
    }

    render() {
        return (
            <div className="main-screen">
                <CodeSampleEditor code={this.state.newCodeSample} onChange={this.codeChangeHandler} onSave={this.codeSaveHandler}/>
                <List list={this.props.codeSamples} onDelete={this.codeDeleteHandler} onEdit={this.codeEditHandler } />
            </div>
        );
    }
}

export default MainScreen;