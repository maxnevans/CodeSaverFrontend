import React, { PureComponent } from 'react';

class UserBar extends PureComponent {
    constructor(props) {
        super(props);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div className="user-bar">
                <div className="login">Login: {this.props.user?.login ?? "<undefined>"}</div>
                <button className={'signout-button'} onClick={this.signOutHandler}>Sign out</button>
            </div>
        );
    }
}

export default UserBar;