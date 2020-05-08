import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import assign from 'lodash.assign';

export default class UserProfileScreen extends PureComponent {
    static propTypes = {
        api: PropTypes.object.isRequired,
        editing: PropTypes.object.isRequired,
        fetchUser: PropTypes.func.isRequired,
        saveUser: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        setName: PropTypes.func.isRequired,
        setSecondName: PropTypes.func.isRequired,
        setLogin: PropTypes.func.isRequired,
        setAvatars: PropTypes.func.isRequired,
        deleteAvatars: PropTypes.func.isRequired,
        uploadAvatar: PropTypes.func.isRequired,
        changePassword: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired,
        clearDidSave: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            didSyncEditingWithApi: false,
            didEdit: false,
        };

        this.avatarFileInput = React.createRef();

        this.onSaveClick = this.onSaveClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onAvatarDeleteClick = this.onAvatarDeleteClick.bind(this);
        this.onAvatarUpload = this.onAvatarUpload.bind(this);
        this.onAvatarClick = this.onAvatarClick.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSecondNameChange = this.onSecondNameChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChangeClick = this.onPasswordChangeClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
    }

    onResetClick(e) {
        e.preventDefault();
        this.props.setUser(this.props.api.user);
    }

    onSaveClick(e) {
        e.preventDefault();
        this.props.saveUser(assign({}, this.props.api.user, this.props.editing));
    }

    onAvatarDeleteClick(e) {
        e.preventDefault();

        if (!this.state.didEdit) {
            this.setState({didEdit: true});
            this.props.clearDidSave();
        }

        this.props.deleteAvatars();
    }

    onAvatarUpload(e) {
        if (e.target.files.length == 0)
            return;

        if (!this.state.didEdit) {
            this.setState({didEdit: true});
            this.props.clearDidSave();
        }

        const avatarFile = e.target.files[0];
        this.props.uploadAvatar(avatarFile);
    }

    onAvatarClick(e) {
        e.preventDefault();

        this.avatarFileInput.current.click();
    }

    onDeleteClick(e) {
        e.preventDefault();

        this.props.deleteUser();
    }

    onPasswordChangeClick(e) {
        e.preventDefault();

        this.props.changePassword();
    }

    onNameChange(e) {
        if (!this.state.didEdit) {
            this.setState({didEdit: true});
            this.props.clearDidSave();
        }

        this.props.setName(e.target.value);
    }

    onSecondNameChange(e) {
        if (!this.state.didEdit) {
            this.setState({didEdit: true});
            this.props.clearDidSave();
        }

        this.props.setSecondName(e.target.value);
    }

    onLoginChange(e) {
        if (!this.state.didEdit) {
            this.setState({didEdit: true});
            this.props.clearDidSave();
        }

        this.props.setLogin(e.target.value);
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    componentDidUpdate() {
        // Sync editing and api data
        if (!this.state.didSyncEditingWithApi && this.props.api.didFetch && this.props.api.error == null) {
            if (this.props.editing.name.length == 0)
                this.props.setName(this.props.api.user.name);

            if (this.props.editing.secondName.length == 0)
                this.props.setSecondName(this.props.api.user.secondName);

            if (this.props.editing.login.length == 0)
                this.props.setLogin(this.props.api.user.login);

            if (this.props.editing.avatar == null)
                this.props.setAvatars(this.props.api.user.avatars);

            this.setState({didSyncEditingWithApi: true});
        }

        if (this.props.api.didSave) {
            this.setState({didEdit: false});
        }
    }

    render() {
        const avatarUrl = this.props.editing.avatars?.[0]?.url;
        const avatarImage = avatarUrl ? <img src={avatarUrl} alt="avatar"/> : null;
        const didNotChanged = this.props.api.didSave && !this.state.didEdit;
        const successMessage = "Profile successfuly saved!";
        const savedMessage = didNotChanged ? <h2 className="message success">{successMessage}</h2> : null;
        let userLetter = this.props.editing.name?.[0] ?? this.props.editing.secondName?.[0] ?? this.props.editing.login?.[0] ?? "U";
        userLetter = userLetter.toUpperCase();

        return (
            <div className="user-profile-screen">
                <div className="user">
                    <h1>User Profile</h1>
                    <div className="line">
                        <div className="inputs">
                            <div className="avatar-group">
                                <div className="avatar" onClick={this.onAvatarClick}>
                                    <div className="letter">{userLetter}</div>
                                    {avatarImage}
                                </div>
                                <div className="avatar-controls">
                                    <button onClick={this.onAvatarDeleteClick} className="avatar-delete">Delete Avatar</button>
                                </div>
                            </div>
                            <div className="info">
                                <input type="text" value={this.props.editing.name} onChange={this.onNameChange} placeholder="Name"/>
                                <input type="text" value={this.props.editing.secondName} onChange={this.onSecondNameChange} placeholder="Second Name"/>
                                <input type="text" value={this.props.editing.login} onChange={this.onLoginChange}  placeholder="Login"/>
                                <button onClick={this.onPasswordChangeClick}>Change Password</button>
                                <input type="file" onChange={this.onAvatarUpload} className="hidden" ref={this.avatarFileInput}/>
                            </div>
                        </div>
                        <div className="controls">
                            <button onClick={this.onSaveClick} className={didNotChanged ? "active" : ""}>Save</button>
                            <button onClick={this.onResetClick} className={didNotChanged ? "active" : ""}>Reset</button>
                        </div>
                    </div>
                    {savedMessage}
                </div>
            </div>
        );
    }
}