import React, { PureComponent } from 'react';

class UserBar extends PureComponent {
    static defaultProps = {
        login: '<empty>'
    };

    constructor(props) {
        super(props);

        this.signOutHandler = this.signOutHandler.bind(this);
    }

    signOutHandler(event) {
        event.preventDefault();
        this.props.onSignOut();
    }

    render() {
        return (
            <div className="user-bar">
                <div className="login">Login: {this.props.login}</div>
                <button onClick={this.signOutHandler}>Sign out</button>
            </div>
        );
    }
}

export default UserBar;