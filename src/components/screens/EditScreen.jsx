import React, { PureComponent } from 'react';
import Editor from './code-sample/EditorContainer';
import PropTypes from "prop-types";

class EditScreen extends PureComponent {
    static propTypes = {
        error :PropTypes.object,
        popScreen: PropTypes.func.isRequired,
        codeSampleEdit: PropTypes.object.isRequired,
    };

    componentDidUpdate() {
        if (this.props.codeSampleEdit.api.didSave && this.props.error == null) {
            this.props.popScreen();
        }
    }

    render() {
        const authorAvatarUrl = this.props.codeSampleEdit.api.codeSample?.author?.avatars?.[0]?.url;
        const athorAvatarImage = authorAvatarUrl != null ? <img src={authorAvatarUrl} alter="author avatar"></img> : null;
        
        let authorName = "";
        if (this.props.codeSampleEdit.api.codeSample?.author?.name && this.props.codeSampleEdit.api.codeSample?.author?.secondName)
            authorName = `${this.props.codeSampleEdit.api.codeSample?.author?.name} ${this.props.codeSampleEdit.api.codeSample?.author?.secondName}`;
        else if (this.props.codeSampleEdit.api.codeSample?.author?.name || this.props.codeSampleEdit.api.codeSample?.author?.secondName)
            authorName = `${this.props.codeSampleEdit.api.codeSample?.author?.name ?? ""}${this.props.codeSampleEdit.api.codeSample?.author?.secondName ?? ""}`;
        else if (this.props.codeSampleEdit.api.codeSample?.author?.login) 
            authorName = this.props.codeSampleEdit.api.codeSample?.author.login;
        else 
            authorName = "<unknown>";

        const userLetter = authorName[0].toUpperCase();
        
        const createdTime = this.props.codeSampleEdit?.api?.codeSample?.createdTime;
        const editedTime = this.props.codeSampleEdit?.api?.codeSample?.editedTime;

        const createTimeDiv = createdTime ? <div className="code-created">{new Date(createdTime).toLocaleString()}</div> : null;
        const editedTimeDiv = editedTime ? <div className="code-edited">{new Date(editedTime).toLocaleString()}</div> : null;

        return (
            <div className="edit-screen">
                <div className="author">
                    <div className="description">Author: </div>
                    <div className="avatar">
                        <div className="letter">
                            {userLetter}
                        </div>
                        {athorAvatarImage}
                    </div>
                    <div className="name">
                        {authorName}
                    </div>
                </div>
                <div className="time">
                    {createTimeDiv}
                    {editedTimeDiv}
                </div>
                <Editor {...this.props.codeSampleEdit} />
            </div>
        );
    }
}

export default EditScreen;