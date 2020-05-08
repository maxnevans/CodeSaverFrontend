import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { PASSWORDS_MISMATCH, PASSWORD_IS_OLD,  OLD_PASSWORD_IS_WRONG, PASSWORD_IS_SHORT} from "../../store/popups/password-change/errors";
import cloneDeep from "lodash.clonedeep";

export default class ChangePassword extends PureComponent {
    static propTypes = {
        error: PropTypes.arrayOf(PropTypes.object.isRequired),
        setOldPassword: PropTypes.func.isRequired,
        setPassword: PropTypes.func.isRequired,
        setPasswordRepeat: PropTypes.func.isRequired,
        fetchPassword: PropTypes.func.isRequired,
        changePassword: PropTypes.func.isRequired,
        oldPassword: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordRepeat: PropTypes.string.isRequired,
        clearError: PropTypes.func.isRequired,
        popPopup: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            didSyncErrors: false,
            isWrongOld: false,
            isWrongNew: false,
            isWrongRepeat: false,
            errorMessages: [],
        };

        this.onChangePasswordClick = this.onChangePasswordClick.bind(this);
        this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordRepeatChange = this.onPasswordRepeatChange.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    onCancelClick(e) {
        e.preventDefault();

        this.props.popPopup();
    }

    onChangePasswordClick(e) {
        e.preventDefault();

        this.props.changePassword(this.props.oldPassword, this.props.password, this.props.passwordRepeat);
    }

    onOldPasswordChange(e) {
        if (this.state.didSyncErrors) {
            this.setState({didSyncErrors: false, errorMessages: []});
            this.props.clearError();
        }

        this.setState({isWrongOld: false});
        this.props.setOldPassword(e.target.value);
    }

    onPasswordChange(e) {
        if (this.state.didSyncErrors) {
            this.setState({didSyncErrors: false, errorMessages: []});
            this.props.clearError();
        }

        this.setState({isWrongNew: false});
        this.props.setPassword(e.target.value);
    }

    onPasswordRepeatChange(e) {
        if (this.state.didSyncErrors) {
            this.setState({didSyncErrors: false, errorMessages: []});
            this.props.clearError();
        }

        this.setState({isWrongRepeat: false});
        this.props.setPasswordRepeat(e.target.value);
    }

    componentDidUpdate() {
        if (this.props.error != null && !this.state.didSyncErrors) {
            this.setState({didSyncErrors: true});
            this.props.error.forEach(e => {
                if (e.type == PASSWORDS_MISMATCH)
                    this.setState({isWrongNew: true, isWrongRepeat: true});
                if (e.type == PASSWORD_IS_OLD)
                    this.setState({isWrongNew: true, isWrongOld: true});
                if (e.type == OLD_PASSWORD_IS_WRONG)
                    this.setState({isWrongOld: true});
                if (e.type == PASSWORD_IS_SHORT)
                    this.setState({isWrongNew: true});

                this.setState(state => {
                    const errors = cloneDeep(state.errorMessages);
                    errors.push(e.message);
                    return {errorMessages: errors};
                });
            });
        }
    }

    componentDidMount() {
        this.props.fetchPassword();
    }

    render() {
        const errors = this.state.errorMessages.map((msg, index) => <div key={index}>{msg}</div>);
        const errorBlock = errors.length != 0 ? <div className="errors">{errors}</div> : null; 

        return (
            <div className="change-password-popup">

                {errorBlock}
                <input 
                    className={this.state.isWrongOld ? "input-wrong" : ""}
                    type="password" 
                    placeholder="Old password" 
                    value={this.oldPassword} 
                    onChange={this.onOldPasswordChange} />
                <input 
                    className={this.state.isWrongNew ? "input-wrong" : ""}
                    type="password" 
                    placeholder="New password" 
                    value={this.password} 
                    onChange={this.onPasswordChange} />
                <input 
                    className={this.state.isWrongRepeat ? "input-wrong" : ""}
                    type="password" 
                    placeholder="Repeat password" 
                    value={this.passwordRepeat} 
                    onChange={this.onPasswordRepeatChange} />
                <div className="controls">
                    <button onClick={this.onChangePasswordClick}>Confirm</button>
                    <button onClick={this.onCancelClick}>Cancel</button>
                </div>
            </div>
        );
    }
}