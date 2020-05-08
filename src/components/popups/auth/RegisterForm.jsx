import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

class RegisterForm extends PureComponent {
    static propTypes = {
        setLogin: PropTypes.func.isRequired,
        setPassword: PropTypes.func.isRequired,
        setPasswordRepeat: PropTypes.func.isRequired,
        registerUser: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired,
        popPopup: PropTypes.func.isRequired,
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordRepeat: PropTypes.string.isRequired,
        error: PropTypes.object,
    };

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

    onLoginChange = (event) => {
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

    onRegisterButtonClick(event) {
        event.preventDefault();
        this.props.registerUser({login: this.props.login, password: this.props.password});
        this.setState({didRegister: true});
    }

    componentDidUpdate() {
        if (this.props.error) {
            this.setState({userExists: true});
            this.props.clearError();
        }

        if (this.state.didRegister && this.props.error == null) {
            this.props.popPopup();
        }
    }

    render() {
        const wrongLogin = this.state.userExists ? 'input-wrong' : '';
        const passwordsMismatch = this.state.passwordsMismatch && this.state.didRegister ? 'input-wrong' : '';

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