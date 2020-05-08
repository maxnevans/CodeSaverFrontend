import {popPopup} from "../../../store/popups/actions";
import {loginUser, clearError } from "../../../store/user/actions";
import {setLogin, setPassword} from "../../../store/popups/auth/login/actions";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    let popupState = state.popups.stack[state.popups.stack.length - 1];
    return {
        ...popupState.authEditing
    };
};

const mapDispatchToProps = {
    setLogin,
    setPassword,
    loginUser,
    popPopup,
    clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);