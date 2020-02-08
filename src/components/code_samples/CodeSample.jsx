import React, { Component } from "react";

class CodeSample extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <fieldset>
                <legend>Code sample</legend>
                <div className="codeId">{this.props.codeId}</div>
                <div className="created-time">{this.props.createdTime}</div>
            </fieldset>
        );
    }
}

export default CodeSample;