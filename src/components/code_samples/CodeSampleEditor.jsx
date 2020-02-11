import React, { Component } from "react";
import coreApp from "../../core/app";

class CodeSampleEditor extends Component {
    static defaultProps = {
        codeName: '<name not provided>',
        codeEdited: '<time not provided>',
        codeCreated: '<time not provided>',
        codeText: '<code not provided>'
    }

    constructor(props) {
        super(props);

        this.state = {
            code: {
                name: '',
                edited_time: '',
                created_time: '',
                code: ''
            }
        };

        this.codeChangeHandler = this.codeChangeHandler.bind(this);
        this.codeNameChangeHandler = this.codeNameChangeHandler.bind(this);
        this.saveCodeHandler = this.saveCodeHanlder.bind(this);
    }

    componentDidMount() {
        coreApp.getCodeSample(this.props.codeId)
            .then(code => this.setState({code}))
            .catch(err => console.log(err));
    }

    codeNameChangeHandler(event) {
        const codeName = event.target.value;

        this.setState(state => {
            return {
                code: {
                    ...state.code,
                    name: codeName
                }
            };
        });
    }

    codeChangeHandler(event) {
        const code = event.target.value;

        this.setState(state => {
            return {
                code: {
                    ...state.code,
                    code: code
                }
            };
        });
    }

    saveCodeHanlder() {
        console.log(this.state.code);
        coreApp.editCodeSample(this.state.code.id, this.state.code.name, this.state.code.code)
            .then(res => this.props.onSave())
            .catch(err => console.log(err));
    }

    render() {
        const editedItem = this.state.code.edited_time ? <div className="code-edited">{this.state.code.edited_time}</div> : null;

        return (
            <div className="code-editor">
                <input className="code-name" value={this.state.code.name} onChange={this.codeNameChangeHandler} />
                {editedItem}
                <div className="code-created">{this.state.code.created_time}</div>
                <textarea className="code-text" onChange={this.codeChangeHandler} value={this.state.code.code}></textarea>
                <button onClick={this.saveCodeHandler}>Save</button>
            </div>
        );
    }
}

export default CodeSampleEditor;