import React, {Component} from "react";

class CodeSourceText extends Component {
    constructor(props) {
        super(props);

        this.codeChangeHandler = this.codeChangeHandler.bind(this);
    }

    codeChangeHandler(event) {
        this.props.onCodeChange(event.target.value);
    }

    render() {
        return (
            <textarea value={this.props.code} onChange={this.codeChangeHandler} ></textarea>
        );
    }
}

export default CodeSourceText;

