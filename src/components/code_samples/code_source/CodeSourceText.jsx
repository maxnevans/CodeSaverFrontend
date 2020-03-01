import React, {PureComponent} from "react";
import Prism from 'prismjs';
import CodeEditor from 'react-simple-code-editor';

class CodeSourceText extends PureComponent {
    static TAB_SIZE = 4;

    constructor(props) {
        super(props);

        this.codeChangeHandler = this.codeChangeHandler.bind(this);
        this.codeHighlightHandler = this.codeHighlightHandler.bind(this);
    }

    codeChangeHandler(code) {
        this.props.onCodeChange(code);
    }

    codeHighlightHandler(code) {
        return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }

    render() {
        return (
            <CodeEditor
                tabSize={CodeSourceText.TAB_SIZE}
                value={this.props.code}
                onValueChange={this.codeChangeHandler}
                highlight={this.codeHighlightHandler}
                preClassName={'code-source-text language-javascript'}
            />
        );
    }
}

export default CodeSourceText;

