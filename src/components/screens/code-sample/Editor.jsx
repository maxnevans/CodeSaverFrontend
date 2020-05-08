import React, { PureComponent } from "react";
import DataSource from "./editor-data/DataSource";
import merge from "lodash.merge";
import PropTypes from "prop-types";

class Editor extends PureComponent {
    static propTypes = {
        editing: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        saveCodeSample: PropTypes.func.isRequired,
        setCodeSampleName: PropTypes.func.isRequired,
        setCodeSampleData: PropTypes.func.isRequired,
        clearDidFetch: PropTypes.func.isRequired,
        updateMods: PropTypes.func.isRequired,
        user: PropTypes.object,
    };
    constructor(props) {
        super(props);

        this.state = {
            isWrongName: false,
            isWrongCode: false,
            didSyncApiAndEditing: false,
            disabled: false,
        };

        this.onCodeNameChange = this.onCodeNameChange.bind(this);
        this.onSaveCode = this.onSaveCode.bind(this);
        this.onCodeDataChange = this.onCodeDataChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onIsReadPrivateChange = this.onIsReadPrivateChange.bind(this);
        this.onIsWritePrivateChange = this.onIsWritePrivateChange.bind(this);
    }

    onIsReadPrivateChange(e) {
        if (this.state.disabled)
            return;

        this.props.updateMods({isReadPrivate: e.target.checked});
    }

    onIsWritePrivateChange(e) {
        if (this.state.disabled)
            return;

        this.props.updateMods({isWritePrivate: e.target.checked});
    }

    onSaveCode() {
        const code = this.props.editing;

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

        this.props.saveCodeSample(merge({}, this.props.api.codeSample, this.props.editing));
    }

    onKeyDown(event) {
        if (event.ctrlKey && event.key == 's') {
            event.preventDefault();
            return this.onSaveCode();
        }
    }
    
    onCodeNameChange(event) {
        if (this.state.disabled)
            return;

        this.setState({isWrongName: false});
        this.props.setCodeSampleName(event.target.value);
    }

    onCodeDataChange(sourceType, sourceData) {
        if (this.state.disabled)
            return;

        this.setState({isWrongCode: false});
        this.props.setCodeSampleData(sourceType, sourceData);
    }

    componentDidUpdate() {
        // Sync data from api and editable data
        if (this.props.api.didFetch && !this.state.didSyncApiAndEditing && this.props.api.error == null) {
            if (this.props.editing.name.length == 0)
                this.props.setCodeSampleName(this.props.api.codeSample.name);

            if (this.props.editing.type == DataSource.SOURCE_TEXT && this.props.editing.data.length == 0
                || this.props.editing.type == DataSource.SOURCE_FILES && this.props.editing.data[0].size == 0)
                this.props.setCodeSampleData(this.props.api.codeSample.type, this.props.api.codeSample.data);

            this.props.updateMods(this.props.api.codeSample.mods);

            const disabled = this.props.api.codeSample.mods.isWritePrivate && this.props.api.codeSample.author.id != this.props.user?.id;
            this.setState({didSyncApiAndEditing: true, disabled});
            this.props.clearDidFetch();
        }
    }

    render() {
        const inputNameWrong = this.state.isWrongName ? 'input-wrong' : '';
        const inputCodeWrong = this.state.isWrongCode;

        return (
            <div className="code-creator" onKeyDown={this.onKeyDown}>
                <div className="line">
                    <input 
                        placeholder="Sample name" 
                        type="text" 
                        className={"code-name " + inputNameWrong} 
                        onChange={this.onCodeNameChange} 
                        value={this.props.editing.name} 
                        disabled={this.state.disabled}
                    />
                    <div className="rights">
                        <label>
                            Is Read Private? 
                            <input 
                                type="checkbox" 
                                checked={this.props.editing.mods.isReadPrivate} 
                                onChange={this.onIsReadPrivateChange} 
                                disabled={this.state.disabled}
                                />
                        </label>
                        <label>
                            Is Write Private? 
                            <input 
                                type="checkbox" 
                                checked={this.props.editing.mods.isWritePrivate} 
                                onChange={this.onIsWritePrivateChange} 
                                disabled={this.state.disabled}
                                />
                        </label>
                    </div>
                </div>
                <DataSource 
                    disabled={this.state.disabled}
                    data={this.props.editing.data} 
                    dataType={this.props.editing.type} 
                    isWrong={inputCodeWrong} 
                    onSourceChange={this.onCodeDataChange} />
                {!this.state.disabled ? <button onClick={this.onSaveCode}>Save</button> : null}
            </div>
        );
    }
}

export default Editor;