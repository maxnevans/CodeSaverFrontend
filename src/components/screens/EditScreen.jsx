import React, { PureComponent } from 'react';
import CodeSampleEditor from '../code_samples/CodeSampleEditor';
import App from '../App';
import coreApp from '../../core/app';
import CodeSource from '../code_samples/code_source/CodeSource';
import HttpCodes from '../../core/http-codes';
import QueryHandler from '../../core/query-handler';

class EditScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            codeRetrieved: false,
            code: {
                name: '',
                type: CodeSource.SOURCE_TEXT,
                data: ''
            }
        };
        this.codeSaveHandler = this.codeSaveHandler.bind(this);
        this.codeChangeHandler = this.codeChangeHandler.bind(this);

        this._getCodeSampleResponseHandler = this.getGetCodeSampleResponseHandler();
    }

    getCodeSaveResponseHandler(code) {
        const qh = new QueryHandler((httpCode, body) => console.log(`Default response handler for ${httpCode}: `, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => this.props.onCodeSampleSave(code));
        qh.setupHandler(HttpCodes.UNAUTHORIZED, (httpCode, body) => this.props.onUnauthorized());

        return qh;
    }

    getGetCodeSampleResponseHandler() {
        const qh = new QueryHandler((httpCode, body) => console.log(`Default response handler for ${httpCode}: `, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => this.setState({codeRetrieved: true, code: this.convertCode(body.data.code)}));
        qh.setupHandler(HttpCodes.UNAUTHORIZED, (httpCode, body) => this.props.onUnauthorized());

        return qh;
    }

    codeChangeHandler(code) {
        this.setState(state => ({
            code: {
                ...state.code,
                ...code
            }
        }));
    }

    codeSaveHandler() {
        const code = this.state.code;

        if (code.type == CodeSource.SOURCE_TEXT) {
            coreApp.prepareToQuery(this.getCodeSaveResponseHandler(code)).editCodeSample(code.id, code.name, code.data);
            return;
        }

        if (code.type == CodeSource.SOURCE_FILES) {
            const file = code.data[0];
            coreApp.prepareToQuery(this.getCodeSaveResponseHandler(code)).uploadEditCodeSample(code.id, code.name, file);
            return;
        }
    }

    componentDidMount() {
        coreApp.prepareToQuery(this._getCodeSampleResponseHandler).getCodeSample(this.props.codeSampleId);
    }

    componentDidUpdate() {
        if (!this.state.codeRetrieved || !this.props.user.login)
            coreApp.prepareToQuery(this._getCodeSampleResponseHandler).getCodeSample(this.props.codeSampleId);
    }

    convertCode(dbCode) {
        return {
            ...dbCode,
            created_time: new Date(dbCode['created_time']).toLocaleString(),
            edited_time: dbCode['edited_time'] ? new Date(dbCode['edited_time']).toLocaleString() : null,
            type: CodeSource.SOURCE_TEXT,
            data: dbCode.code
        };
    }

    render() {
        return (
            <div className="edit-screen">
                <CodeSampleEditor onChange={this.codeChangeHandler} code={this.state.code} onSave={this.codeSaveHandler}/>
            </div>
        );
    }
}

export default EditScreen;