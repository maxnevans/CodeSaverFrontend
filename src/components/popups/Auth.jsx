import React, { PureComponent } from 'react';
import LoginForm from './auth/LoginFormContainer';
import RegisterForm from './auth/RegisterFormContainer';
import PropTypes from "prop-types";

class AuthPopup extends PureComponent {
    static propTypes = {
        switchType: PropTypes.func.isRequired,
        authType: PropTypes.string,
    };
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

    _getFormItem(authType) {
        switch (authType) {
            case AuthPopup.LOGIN:
                return <LoginForm />;
            case AuthPopup.REGISTER:
                return <RegisterForm />;
        }
        return null;            
    }

    _getNextAuthType(current) {
        return AuthPopup.#AUTH_CYCLE[(AuthPopup.#AUTH_CYCLE.indexOf(current) + 1) % AuthPopup.#AUTH_CYCLE.length];
    }

    _getSwitchButtonText(authType) {
        switch (this._getNextAuthType(authType)) {
            case AuthPopup.LOGIN:
                return "Switch to login";
            case AuthPopup.REGISTER:
                return "Switch to register";
        }

        return "<Undefined switch type>";
    }

    onSwitchAuthType() {
        this.props.switchType(this._getNextAuthType(this.props.authType));
    }

    render() {
        const formItem = this._getFormItem(this.props.authType);
        const switchButtonContent = this._getSwitchButtonText(this.props.authType);

        return (
            <div className="login-popup">
                <button className="switch-login-register" onClick={this.onSwitchAuthType}>{switchButtonContent}</button>
                {formItem}
            </div>
        );
    }
}

export default AuthPopup;