import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

class CodeSampleListItem extends PureComponent {
    static defaultProps = {
        codeId: null,
        codeName: '<name not provided>',
        codeEdited: '',
        codeCreated: '<time not provided>'
    }

    static propTypes = {
        codeId: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props);

        this.editCodeClickHandle = this.editCodeClickHandle.bind(this);
        this.deleteCodeClickHandle = this.deleteCodeClickHandle.bind(this);
    }

    editCodeClickHandle(event) {
        this.props.onCodeEdit(this.props.codeId);
    }

    deleteCodeClickHandle(event) {
        this.props.onCodeDelete(this.props.codeId);
    }

    render() {
        const editedItem = this.props.codeEdited ? <div className="code-edited">{this.props.codeEdited}</div> : null;

        return (
            <div className="code-list-item">
                <hr/>
                <div className="code-name">{this.props.codeName}</div>
                {editedItem}
                <div className="code-created">{this.props.codeCreated}</div>
                <button onClick={this.editCodeClickHandle}>Edit</button>
                <button onClick={this.deleteCodeClickHandle}>Delete</button>
                <hr/>
            </div>
        );
    }
}

export default CodeSampleListItem;