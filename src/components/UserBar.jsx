import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { USER_PROFILE_SCREEN } from './ScreenType';

class UserBar extends PureComponent {
    static propTypes = {
        logoutUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        pushScreen:PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);

        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onUserProfileClick = this.onUserProfileClick.bind(this);
    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    onUserProfileClick(e) {
        e.preventDefault();
        
        this.props.pushScreen(USER_PROFILE_SCREEN);
    }

    render() {
        const avatarUrl = this.props.user?.avatars?.[0]?.url;
        const avatarImage = avatarUrl ? <img src={avatarUrl} alt="Avatar"/> : null;

        let name = "";
        if (this.props.user?.name && this.props.user?.secondName)
            name = `${this.props.user?.name} ${this.props.user?.secondName}`;
        else if (this.props.user?.name || this.props.user?.secondName)
            name = `${this.props.user?.name ?? ""}${this.props.user?.secondName ?? ""}`;
        else if (this.props.user?.login) 
            name = this.props.user.login;
        else 
            name = "Unknown";

        const userLetter = name[0].toUpperCase();

        return (
            <div className="user-bar">
                <div className="avatar">
                    <div className="letter">{userLetter}</div>
                    {avatarImage}
                </div>
                <button className="name-button" onClick={this.onUserProfileClick}>{name}</button>
                <button className="signout-button" onClick={this.onLogoutClick}>Sign out</button>
            </div>
        );
    }
}

export default UserBar;