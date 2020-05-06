import {connect} from "react-redux";
import {popPopup} from "../../../store/popups/actions";
import {loginUser, clearError } from "../../../store/user/actions";
import {setLogin, setPassword} from "../../../store/popups/auth/login/actions";
import LoginForm from "./LoginForm"

const LoginFormContainer = (props) => {
    return <LoginForm {...props}  />;
};

const mapStateToProps = (state) => {
    let popupState = state.popups[state.popups.length - 1];
    return {
        ...popupState.authEditing
    };
};

const mapActionsToProps = {
    setLogin,
    setPassword,
    loginUser,
    popPopup,
    clearError,
};

export default connect(mapStateToProps, mapActionsToProps)(LoginFormContainer);