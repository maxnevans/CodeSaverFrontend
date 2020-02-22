import React, { PureComponent } from 'react';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import coreApp from '../core/app';
import App from './App';

class LoginScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoginForm: true
        };

        this.switchFormsHandler = this.switchFormsHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    }
    
    componentDidMount() {
        if (coreApp.autologin()) {
            coreApp.testAuth()
                .then(res => this.props.onGoForward(App.MAIN_SCREEN, {user: res}, true))
                .catch(err => {
                    console.log(`failed to autologin: ${err.status} `, err.body);
                    coreApp.autologin(false);
                });
        }
    }

    loginHandler(userData) {
        coreApp.loginUser(userData.login, userData.password)
            .then(res => {
                coreApp.autologin(true);
                this.props.onGoForward(App.MAIN_SCREEN, {user: userData}, true);
            })
            .catch(error => console.log(`failed to login: ${error.status} `, error.body));
    }

    registerHandler(userData) {
        coreApp.registerUser(userData.login, userData.password)
            .then(res => console.log(res))
            .catch(error => console.log(error));
    }

    switchFormsHandler() {
        this.setState(state => ({
            isLoginForm: !state.isLoginForm
        }));
    }

    render() {

        let formItem = null;

        if (this.state.isLoginForm) {
            formItem = <LoginForm
                onLogin={this.loginHandler}
            />; 
        } else {
            formItem = <RegisterForm
                onRegister={this.registerHandler}
            />;
        }

        const switchButtonContent = this.state.isLoginForm ? 'Switch to register' : 'Switch to login';

        return (
            <div className="login-screen">
                <button className="switch-login-register" onClick={this.switchFormsHandler}>{switchButtonContent}</button>
                {formItem}
            </div>
        );
    }
}

export default LoginScreen;