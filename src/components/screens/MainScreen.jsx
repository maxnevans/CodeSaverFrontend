import React, { PureComponent } from 'react';
import Editor from './code-sample/EditorContainer';
import List from './code-sample/ListContainer';

class MainScreen extends PureComponent {
    render() {
        return (
            <div className="main-screen">
                <Editor apiCodeSample={this.props.newCodeSample.api.codeSample}
                        editingCodeSample={this.props.newCodeSample.editing}
                        error={this.props.newCodeSample.api.error} />
                <List />
            </div>
        );
    }
}

export default MainScreen;