import React, { Component } from "react";
import CodeSource from "./code_source/CodeSource";
import coreApp from "../../core/app";

class CodeSampleCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: {
                name: '',
                type: CodeSource.SOURCE_TEXT,
                data: ''
            }
        };
        this.codeNameChangeHandler = this.codeNameChangeHandler.bind(this);
        this.saveCodeClickHandler = this.saveCodeClickHandler.bind(this);
        this.codeChangeHandler = this.codeChangeHandler.bind(this);
    }

    codeNameChangeHandler(event) {
        const name = event.target.value;

        this.setState((state, props) => {
            return {
                code: {
                    ...state.code,
                    name
                }
            }
        });
    }

    saveCodeClickHandler(event) {
        if (this.state.code.type == CodeSource.SOURCE_TEXT) {
            coreApp.createCodeSample(this.state.code.name, this.state.code.data.toString())
                .then(res => console.log(res))
                .catch(err => console.log(err));

            return;
        }

        if (this.state.code.type == CodeSource.SOURCE_FILES) {
            coreApp.uploadCreateCodeSample(this.state.code.name, this.state.code.data[0])
                .then(res => console.log(res))
                .catch(err => console.log(err));

            return;
        }
    }

    codeChangeHandler(sourceType, sourceData) {
        this.setState((state, props) => {
            return {
                code: {
                    ...state.code,
                    type: sourceType,
                    data: sourceData
                }
            };
        });
    }

    render() {
        return (
            <div className="code-creator">
                <input type="text" className="code-name" onChange={this.codeNameChangeHandler} value={this.state.code.name} />
                <CodeSource code={this.state.code.data} onSourceChange={this.codeChangeHandler} />
                <button onClick={this.saveCodeClickHandler}>Save</button>
            </div>
        );
    }
}

export default CodeSampleCreator;