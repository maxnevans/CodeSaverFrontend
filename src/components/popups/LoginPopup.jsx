import React, { PureComponent } from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import coreApp from '../../core/app';
import QueryHandler from '../../core/query-handler';
import HttpCodes from '../../core/http-codes';

class LoginPopup extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoginForm: true,
        };

        this.switchFormsHandler = this.switchFormsHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    }

    getLoginQueryHandler(userData) {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled query: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            coreApp.autologin(true);
            this.props.onSuccess(userData);
        });

        qh.setupHandler(HttpCodes.NOT_FOUND, (httpCode, body) => {
            this.setState({userExists: false});
        });

        return qh;
    }

    getRegisterQueryHandler(userData) {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled query: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            this.setState({userExists: false});
            coreApp.prepareToQuery(this.getLoginQueryHandler(userData)).loginUser(body.data.user.login, body.data.user.password);
        });

        qh.setupHandler(HttpCodes.NOT_ACCEPTABLE, (httpCode, body) => this.setState({userExists: true}));

        return qh;
    }

    getTestAuthQueryHandler() {
        const qh = new QueryHandler((httpCode, body) => console.log(`Unhandled query: ${httpCode}`, body));

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            this.props.onSuccess(body.data.user);
        });

        return qh;
    }
    
    componentDidMount() {
        if (coreApp.autologin()) {
            coreApp.prepareToQuery(this.getTestAuthQueryHandler()).testAuth();
        }
    }

    loginHandler(userData) {
        coreApp.prepareToQuery(this.getLoginQueryHandler(userData)).loginUser(userData.login, userData.password);
    }

    registerHandler(userData) {
        coreApp.prepareToQuery(this.getRegisterQueryHandler(userData)).registerUser(userData.login, userData.password);
    }

    switchFormsHandler() {
        this.setState(state => ({
            isLoginForm: !state.isLoginForm
        }));
    }

    getFormItem(isLogin) {
        return isLogin ?
            <LoginForm userExists={this.state.userExists} onLogin={this.loginHandler} /> :
            <RegisterForm userExists={this.state.userExists} onRegister={this.registerHandler} />;
    }

    render() {
        const formItem = this.getFormItem(this.state.isLoginForm);
        const switchButtonContent = this.state.isLoginForm ? 'Switch to register' : 'Switch to login';

        return (
            <div className="login-popup">
                <button className="switch-login-register" onClick={this.switchFormsHandler}>{switchButtonContent}</button>
                {formItem}
            </div>
        );
    }
}

export default LoginPopup;