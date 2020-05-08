import React, { PureComponent } from 'react';
import Editor from './code-sample/EditorContainer';
import List from './code-sample/ListContainer';
import PropTypes from "prop-types";

class MainScreen extends PureComponent {
    static propTypes = {
        newCodeSample: PropTypes.object.isRequired,
    };
    render() {
        return (
            <div className="main-screen">
                <Editor {...this.props.newCodeSample} />
                <List />
            </div>
        );
    }
}

export default MainScreen;