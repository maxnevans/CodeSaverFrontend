import React, { PureComponent } from 'react';

class RegisterForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            didRegister: false,
            userExists: false,
            passwordsMismatch: false,
        };
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordRepeatChange = this.onPasswordRepeatChange.bind(this);
        this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
    }

    onLoginChange(event) {
        this.props.setLogin(event.target.value);
    }

    onPasswordChange(event) {
        this.setState({passwordsMismatch: this.props.passwordRepeat != event.target.value});
        this.props.setPassword(event.target.value);
    }

    onPasswordRepeatChange(event) {
        this.setState({passwordsMismatch: this.props.password != event.target.value});
        this.props.setPasswordRepeat(event.target.value);
    }

    onRegisterButtonClick() {
        this.props.registerUser(this.props.login, this.props.password);
        this.setState({didRegister: true});
    }

    componentDidUpdate() {
        if (this.props.error) {
            this.setState({userExists: true});
            this.props.clearError();
        }

        if (this.props.didRegister && this.props.error == null) {
            this.props.popPopup();
        }
    }

    onLoginChange(event) {
        this.props.setLogin(event.target.value);
    }

    onPasswordChange(event) {
        this.props.setPassword(event.target.value);
    }

    onPasswordRepeatChange(event) {
        this.props.setPasswordRepeat(event.target.value);
    }

    render() {
        const wrongLogin = this.props.userExists ? 'input-wrong' : '';
        const passwordsMismatch = this.state.passwordsMismatch && this.props.didRegister ? 'input-wrong' : '';

        return (
            <form className="register-form" autoComplete="off">
                <input 
                    className={wrongLogin} 
                    type="text" 
                    onChange={this.onLoginChange} 
                    value={this.props.login}
                    placeholder="Login" 
                    autoComplete="off"
                />
                <input 
                    className={passwordsMismatch} 
                    type="password" 
                    onChange={this.onPasswordChange} 
                    vallue={this.props.password}
                    placeholder="Password" 
                    autoComplete="off"
                />
                <input 
                    className={passwordsMismatch} 
                    type="password" 
                    onChange={this.onPasswordRepeatChange} 
                    value={this.props.passwordRepeat}
                    placeholder="Repeat password" 
                    autoComplete="off"
                />
                <button onClick={this.onRegisterButtonClick} className={'register-button'}>Register</button>
            </form>
        );
    }
}

export default RegisterForm;