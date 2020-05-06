import React, { PureComponent } from 'react';
import Editor from './code-sample/EditorContainer';

class EditScreen extends PureComponent {
    componentDidUpdate() {
        if (this.props.didSave && this.props.error == null) {
            this.props.popScreen();
        }
    }

    render() {
        return (
            <div className="edit-screen">
                <Editor apiCodeSample={this.props.codeSampleEdit.api.codeSample}
                        editingCodeSample={this.props.codeSampleEdit.editing}
                        error={this.props.codeSampleEdit.api.error} />
            </div>
        );
    }
}

export default EditScreen;