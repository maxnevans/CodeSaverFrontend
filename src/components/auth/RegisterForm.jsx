import React, { PureComponent } from 'react';

class RegisterForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            wrongLogin: false,
            wrongPassword: false,
            wrongRepassword: false,
            login: '',
            password: '',
            repassword: ''
        };

        this.loginChangeHandler = this.loginChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.repasswordChangeHandler = this.repasswordChangeHandler.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
    }

    loginChangeHandler(event) {
        this.setState({
            login: event.target.value,
        });
    }

    passwordChangeHandler(event) {
        this.setState({
            password: event.target.value,
        });
    }

    repasswordChangeHandler(event) {
        this.setState({
            repassword: event.target.value,
        });
    }

    registerHandler(event) {
        event.preventDefault();
        
        const wrongLogin = this.state.login == '' || this.state.login.length < 6;
        const wrongPassword = this.state.password == '' || this.state.password.length < 6;
        const wrongRepassword = this.state.repassword !== this.state.password;

        if (wrongLogin || wrongPassword || wrongRepassword) {
            this.setState({
                wrongLogin,
                wrongPassword,
                wrongRepassword
            });

            return;
        }

        this.props.onRegister({
            login: this.state.login,
            password: this.state.password
        });
    }

    render() {
        const wrongLogin = this.state.wrongLogin ? 'input-wrong' : '';
        const wrongPassword = this.state.wrongPassword ? 'input-wrong' : '';
        const wrongRepassword = this.state.wrongRepassword ? 'input-wrong' : '';

        return (
            <form className="register-form" autoComplete="off">
                <input 
                    className={wrongLogin} 
                    type="text" 
                    onChange={this.loginChangeHandler} 
                    placeholder="Login" 
                    autoComplete="off"
                />
                <input 
                    className={wrongPassword} 
                    type="password" 
                    onChange={this.passwordChangeHandler} 
                    placeholder="Password" 
                    autoComplete="off"
                />
                <input 
                    className={wrongRepassword} 
                    type="password" 
                    onChange={this.repasswordChangeHandler} 
                    placeholder="Repeat password" 
                    autoComplete="off"
                />
                <button onClick={this.registerHandler}>Register</button>
            </form>
        );
    }
}

export default RegisterForm;