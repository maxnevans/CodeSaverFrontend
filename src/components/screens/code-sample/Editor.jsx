import React, { PureComponent } from "react";
import DataSource from "./editor-data/DataSource";
import { DATA_TYPE_TEXT, DATA_TYPE_FILES } from "../../../store/screens/common/code-sample-edit/actions";

class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isWrongName: false,
            isWrongCode: false,
            didSyncApiAndEditing: false,
            didFetch: false,
            didSave: false,
            didDelete: false,
        };

        this.onCodeNameChange = this.onCodeNameChange.bind(this);
        this.onSaveCode = this.onSaveCode.bind(this);
        this.onCodeDataChange = this.onCodeDataChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onSaveCode() {
        const code = this.props.editingCodeSample;

        let isWrong = false;

        if (code.type == DataSource.SOURCE_FILES && code.data[0].size == 0) {
            this.setState({isWrongCode: true});
            isWrong = true;
        }

        if (code.type == DataSource.SOURCE_TEXT && code.data.length == 0) {
            this.setState({isWrongCode: true});
            isWrong = true;
        }

        if (code.name.length == 0) {
            this.setState({isWrongName: true});
            isWrong = true;
        }

        if (isWrong)
            return;

        this.props.saveCodeSample(this.props.editingData);
        this.setState({didSave: true});
    }

    onKeyDown(event) {
        if (event.ctrlKey && event.key == 's') {
            event.preventDefault();
            return this.onSaveCode();
        }
    }
    
    onCodeNameChange(event) {
        this.setState({isWrongName: false});
        this.props.setCodeSampleName(event.target.value);
    }

    onCodeDataChange(sourceType, sourceData) {
        this.setState({isWrongCode: false});
        this.props.setCodeSampleData(sourceType, sourceData);
    }

    componentDidMount() {
        if (!this.props.didFetch) {
            this.props.fetchCodeSample(this.props.apiCodeSample);
            this.setState({
                didSyncApiAndEditing: false,
                didFetch: true,
            });
        }
    }

    componentDidUpdate() {
        // Sync data from api and editable data
        if (this.state.didFetch && !this.state.didSyncApiAndEditing) {
            if (this.props.editingCodeSample.name.length == 0)
                this.props.setCodeSampleName(this.props.apiCodeSample.name);

            if (this.props.editingCodeSample.type == DATA_TYPE_TEXT && this.props.editingCodeSample.data.length == 0
                || this.props.editingCodeSample.type == DATA_TYPE_FILES && this.props.editCodeSample.data[0].size == 0)
                this.props.setCodeSampleData(this.props.apiCodeSample.type, this.props.apiCodeSample.data);

            this.setState({didSyncApiAndEditing: true, didFetch: false});
        }
    }

    render() {
        const inputNameWrong = this.state.isWrongName ? 'input-wrong' : '';
        const inputCodeWrong = this.state.isWrongCode;

        const createdTime = this.props.editingCodeSample?.createdTime;
        const editedTime = this.props.editingCodeSample?.editedTime;

        const createTimeDiv = createdTime ? <div className="code-created">{new Date(createdTime).toLocaleString()}</div> : null;
        const editedTimeDiv = editedTime ? <div className="code-edited">{new Date(editedTime).toLocaleString()}</div> : null;

        return (
            <div className="code-creator" onKeyDown={this.onKeyDown}>
                <input 
                    placeholder="Sample name" 
                    type="text" 
                    className={"code-name " + inputNameWrong} 
                    onChange={this.onCodeNameChange} 
                    value={this.props.editingCodeSample.name} 
                />
                {createTimeDiv}
                {editedTimeDiv}
                <DataSource 
                    data={this.props.editingCodeSample.data} 
                    dataType={this.props.editingCodeSample.type} 
                    isWrong={inputCodeWrong} 
                    onSourceChange={this.onCodeDataChange} />
                <button onClick={this.onSaveCode}>Save</button>
            </div>
        );
    }
}

export default Editor;