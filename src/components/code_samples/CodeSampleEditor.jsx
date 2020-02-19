import React, { Component } from "react";
import CodeSource from "./code_source/CodeSource";

class CodeSampleEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWrongName: false,
            isWrongCode: false,
        };
        this.codeNameChangeHandler = this.codeNameChangeHandler.bind(this);
        this.saveCodeClickHandler = this.saveCodeClickHandler.bind(this);
        this.codeChangeHandler = this.codeChangeHandler.bind(this);
    }

    saveCodeClickHandler(event) {
        const code = this.props.code;

        let isWrong = false;

        if (code.type == CodeSource.SOURCE_FILES && code.data[0].size == 0) {
            this.setState({isWrongCode: true});
            isWrong = true;
        }

        if (code.type == CodeSource.SOURCE_TEXT && code.data.length == 0) {
            this.setState({isWrongCode: true});
            isWrong = true;
        }

        if (code.name.length == 0) {
            this.setState({isWrongName: true});
            isWrong = true;
        }

        if (isWrong)
            return;

        this.props.onSave();
    }
    
    codeNameChangeHandler(event) {
        const codeName = event.target.value;

        this.setState({isWrongName: false});

        this.props.onChange({name: codeName});
    }

    codeChangeHandler(sourceType, sourceData) {
        this.setState({isWrongCode: false});

        this.props.onChange({
            type: sourceType,
            data: sourceData
        });
    }

    render() {
        const inputNameWrong = this.state.isWrongName ? 'input-wrong' : '';
        const inputCodeWrong = this.state.isWrongCode;

        const createdItem = this.props.code.created_time ? <div className="code-created">{this.props.code.created_time}</div> : null;
        const editedItem = this.props.code.edited_time ? <div className="code-edited">{this.props.code.edited_time}</div> : null;

        return (
            

            <div className="code-creator">
                <label htmlFor="" className="code-name-description">Code sample name: </label>
                <input type="text" className={"code-name " + inputNameWrong} onChange={this.codeNameChangeHandler} value={this.props.code.name} />
                {createdItem}
                {editedItem}
                <CodeSource isWrong={inputCodeWrong} code={this.props.code.data} onSourceChange={this.codeChangeHandler} />
                <button onClick={this.saveCodeClickHandler}>Save</button>
            </div>
        );
    }
}

export default CodeSampleEditor;