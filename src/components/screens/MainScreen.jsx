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

        this.setupSocketActions();

        this.codeEditHandler = this.codeEditHandler.bind(this);
        this.codeSaveHandler = this.codeSaveHandler.bind(this);
        this.codeDeleteHandler = this.codeDeleteHandler.bind(this);
        this.codeChangeHandler = this.codeChangeHandler.bind(this);

        this.updateCodeInList = this.updateCodeInList.bind(this);
        this.deleteCodeFromList = this.deleteCodeFromList.bind(this);
        this.createCodeToList = this.createCodeToList.bind(this);

        this._getListResponseHandler = this.getGetListResponseHandler();
    }

    setupSocketActions() {
        coreApp.addSocketMessageHandler('codeEdited', this.updateCodeInList.bind(this));
        coreApp.addSocketMessageHandler('codeDeleted', this.deleteCodeFromList.bind(this));
        coreApp.addSocketMessageHandler('codeCreated', this.createCodeToList.bind(this));
    }

    updateCodeInList({id: sampleId}) {
        console.log('updateCodeInList executing...', sampleId);
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled response: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            const code = body.data.code;

            if (code == null)
                return this.props.onUnauthorized();

            const editedCodeIndex = this.props.codeSamples.reduce((acc, codeFromList, index) => 
                codeFromList.id == code.id && codeFromList.edited_time != code.edited_time ? index : acc, -1);

            if (editedCodeIndex == -1)
                return;

            const codeList = this.props.codeSamples.slice();
            codeList[editedCodeIndex] = {
                ...code,
                created_time: new Date(code.created_time).toLocaleString(),
                edited_time: new Date(code.edited_time).toLocaleString()
            };

            this.props.onCodeSamplesChange(codeList);
        });

        coreApp.prepareToQuery(qh).getCodeSample(sampleId);
    }

    deleteCodeFromList({id: sampleId}) {
        console.log('deleteCodeFromList executing...', sampleId);

        const codeIndex = this.props.codeSamples.reduce((acc, codeFromList, index) => codeFromList.id == sampleId ? index : acc, -1);
        console.log(codeIndex);
        if (codeIndex == -1)
            return;

        const codeList = this.props.codeSamples.slice();
        codeList.splice(codeIndex, 1);

        this.props.onCodeSamplesChange(codeList);
    }

    createCodeToList(code) {
        console.log('createCodeToList executing...', code);

        const codeIndex = this.props.codeSamples.reduce((acc, codeFromList, index) => codeFromList.id == code.id ? index : acc, -1);

        if (codeIndex != -1)
            return;

        const codeList = this.props.codeSamples.slice();
        codeList.unshift({
            ...code,
            created_time: new Date(code.createdTime).toLocaleString()
        });

        this.props.onCodeSamplesChange(codeList);
    }

    getGetListResponseHandler() {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled response: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            if (body.data.codeList == null) {
                return this.props.onUnauthorized();
            }

            const codeSamples = body.data.codeList.map(code => {
                return {
                    ...code,
                    created_time: (new Date(code.created_time).toLocaleString()),
                    edited_time: code.edited_time ? new Date(code.edited_time).toLocaleString() : null
                };
            });
            this.setState({codeSamplesRetrieved: true});
            this.props.onCodeSamplesChange(codeSamples);
        });

        qh.setupHandler(HttpCodes.UNAUTHORIZED, () => this.props.onUnauthorized());

        return qh;
    }

    getSaveCodeResponseHandler(code) {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled response: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            if (body.data.id == null)
                return this.props.onUnauthorized();

            this.setState({newCodeSample: this.getCleanCodeNewSample()});

            const codeSamples = this.props.codeSamples.slice();

            const codeIndex = codeSamples.reduce((acc, codeFromList, index) => codeFromList.id == body.data.id ? index : acc, -1);

            if (codeIndex != -1)
                return;

            let list = codeSamples.slice();

            code.id = body.data.id;
            code.data = null;
            code.created_time = (new Date()).toLocaleString();

            list.splice(0, 0, code);


            this.props.onCodeSamplesChange(list);
           
        });

        qh.setupHandler(HttpCodes.UNAUTHORIZED, () => this.props.onUnauthorized());

        return qh;
    }

    getDeleteResponseHandler(sampleId) {
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
            coreApp.prepareToQuery(this.getSaveCodeResponseHandler(code)).uploadCreateCodeSample(code.name, file);
            return;
        }
    }

    codeDeleteHandler(sampleId) {
        coreApp.prepareToQuery(this.getDeleteResponseHandler(sampleId)).deleteCodeSample(sampleId);
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