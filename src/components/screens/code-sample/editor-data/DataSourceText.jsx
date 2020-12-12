import React, {PureComponent} from "react";
import Prism from 'prismjs';
import CodeEditor from 'react-simple-code-editor';
import PropTypes from "prop-types";

class DataSourceText extends PureComponent {
    static propTypes = {
        onCodeChange: PropTypes.func.isRequired,
        code: PropTypes.string.isRequired,
        disabled: PropTypes.bool.isRequired,
    };

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
                className="code-source-text-field"
                disabled={this.props.disabled}
                tabSize={DataSourceText.TAB_SIZE}
                value={this.props.code}
                padding={10}
                onValueChange={this.codeChangeHandler}
                highlight={this.codeHighlightHandler}
                preClassName={"language-javascript"}
            />
        );
    }
}

export default DataSourceText;

