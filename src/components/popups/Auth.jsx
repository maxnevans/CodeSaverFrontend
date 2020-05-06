import React, { PureComponent } from 'react';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';

class AuthPopup extends PureComponent {
    static LOGIN = "login";
    static REGISTER = "register";
    static #AUTH_CYCLE = [
        this.LOGIN,
        this.REGISTER
    ];

    constructor(props) {
        super(props);

        this.onSwitchAuthType = this.onSwitchAuthType.bind(this);
    }

    #getFormItem(authType) {
        switch(authType) {
            case AuthPopup.LOGIN:
                return <LoginForm userExists={this.state.userExists} />
            case AuthPopup.REGISTER:
                return <RegisterForm userExists={this.state.userExists} />;
        }
        return null;            
    }

    #getNextAuthType(current) {
        return (AuthPopup.#AUTH_CYCLE.indexOf(current) + 1) % AuthPopup.#AUTH_CYCLE.length;
    }

    #getSwitchButtonText(authType) {
        switch (this.#getNextAuthType(authType)) {
            case AuthPopup.LOGIN:
                return "Switch to login";
            case AuthPopup.REGISTER:
                return "Switch to register";
        }

        return "<Undefined switch type>";
    }

    onSwitchAuthType() {
        this.props.swithType(this.#getNextAuthType(this.props.authType));
    }

    render() {
        const formItem = this.#getFormItem(this.props.authType);
        const switchButtonContent = this.#getSwitchButtonText(this.props.authType);

        return (
            <div className="login-popup">
                <button className="switch-login-register" onClick={this.onSwitchAuthType}>{switchButtonContent}</button>
                {formItem}
            </div>
        );
    }
}

export default AuthPopup;