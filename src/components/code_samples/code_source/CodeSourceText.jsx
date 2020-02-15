import React, {Component} from "react";
import Prism from 'prismjs';
import ContentEditable from 'react-contenteditable'

class CodeSourceText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clearCode: this.props.code,
            highlightedCode: this.props.code
        };
        this.codeEditor = React.createRef();
        this.codeChangeHandler = this.codeChangeHandler.bind(this);
        this.specialKeysHandler = this.specialKeysHandler.bind(this);
    }

    specialKeysHandler(event) {
        if (event.code == 'Tab') {
            const countSpaces = 4;
            const spaces = ' '.repeat(countSpaces);

            this.props.onCodeChange(this.codeEditor.current.innerText + spaces);
            event.preventDefault();
        } 
        
    }

    componentDidMount() {
        this.codeEditor.current.onkeydown = this.specialKeysHandler;
    }

    codeChangeHandler(event) {
        this.props.onCodeChange(this.codeEditor.current.innerText);
    }

    componentDidUpdate() {
        if (this.state.clearCode !== this.props.code) {
            this.setState({
                clearCode: this.props.code,
                highlightedCode: Prism.highlight(this.props.code, Prism.languages.javascript, 'javascript')
            });
        }
    }

    render() {
        return (
            <ContentEditable html={this.state.highlightedCode} 
                className="code-source-text language-javascript" innerRef={this.codeEditor} onChange={this.codeChangeHandler} 
                style={{'whiteSpace': 'pre'}} />
        );
    }
}

export default CodeSourceText;

