import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

class LoginForm extends PureComponent {
    static propTypes = {
        setPassword: PropTypes.func.isRequired,
        setLogin: PropTypes.func.isRequired,
        loginUser: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired,
        popPopup: PropTypes.func.isRequired,
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        error: PropTypes.object,
    };
    constructor(props) {
        super(props);

        this.state = {
            didLogin: false,
            wrongPasswordOrLogin: false,
        };
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    }

    onPasswordChange(event) {
        this.props.setPassword(event.target.value);
        this.setState({wrongPasswordOrLogin: false});
    }

    onLoginChange(event) {
        this.props.setLogin(event.target.value);
        this.setState({wrongPasswordOrLogin: false});
    }

    onLoginButtonClick(event) {
        event.preventDefault();
        this.props.loginUser({login: this.props.login, password: this.props.password});
        this.setState({didLogin: true});
    }

    componentDidUpdate() {
        if (this.props.error) {
            this.setState({wrongPasswordOrLogin: true});
            this.props.clearError();
        }

        if (this.state.didLogin && this.props.error == null) {
            this.props.popPopup();
        }
    }

    render() {
        const wrong = this.state.wrongPasswordOrLogin && this.state.didLogin ? 'input-wrong' : '';

        return (
            <form className="login-form" autoComplete="off">
                <input 
                    className={wrong + ' login-input'} 
                    type="text" 
                    onChange={this.onLoginChange} 
                    value={this.props.login} 
                    placeholder="Login"
                    autoComplete="off"
                />
                <input 
                    className={wrong + ' password-input'} 
                    type="password" 
                    onChange={this.onPasswordChange} 
                    value={this.props.password} 
                    placeholder="Password"
                    autoComplete="off"
                />
                <button onClick={this.onLoginButtonClick} className={'login-button'}>Login</button>
            </form>
        );
    }
}

export default LoginForm;