import React, { PureComponent } from 'react';

class LoginForm extends PureComponent {
    static defaultProps = {
        userExists: true
    };

    constructor(props) {
        super(props);
        
        this.state = {
            wrongLogin: false,
            wrongPassword: false,
            login: '',
            password: '',
        };

        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    changeLoginHandler(event) {
        this.setState({
            login: event.target.value
        });
    }

    changePasswordHandler(event) {
        this.setState({
            password: event.target.value
        });
    }

    loginHandler(event) {
        event.preventDefault();
        
        const wrongLogin = this.state.login == '' || this.state.login.length < 6;
        const wrongPassword = this.state.password == '' || this.state.password.length < 6;

        if (wrongLogin || wrongPassword) {
            this.setState({
                wrongLogin,
                wrongPassword
            });

            return;
        }

        this.props.onLogin({
            login: this.state.login,
            password: this.state.password
        });
    }

    render() {
        const wrongLogin = this.state.wrongLogin || !this.props.userExists ? 'input-wrong' : '';
        const wrongPassword = this.state.wrongPassword || !this.props.userExists ? 'input-wrong' : '';

        return (
            <form className="login-form" autoComplete="off">
                <input 
                    className={wrongLogin + ' login-input'} 
                    type="text" 
                    onChange={this.changeLoginHandler} 
                    value={this.state.login} 
                    placeholder="Login"
                    autoComplete="off"
                />
                <input 
                    className={wrongPassword + ' password-input'} 
                    type="password" 
                    onChange={this.changePasswordHandler} 
                    value={this.state.password} 
                    placeholder="Password"
                    autoComplete="off"
                />
                <button onClick={this.loginHandler} className={'login-button'}>Login</button>
            </form>
        );
    }
}

export default LoginForm;