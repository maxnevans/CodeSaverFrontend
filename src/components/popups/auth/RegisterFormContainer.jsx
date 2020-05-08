import {connect} from "react-redux";
import {popPopup} from "../../../store/popups/actions";
import {registerUser} from "../../../store/user/actions";
import {setLogin, setPassword, setPasswordRepeat, clearError} from "../../../store/popups/auth/register/actions";
import RegisterForm from "./RegisterForm";

const mapStateToProps = (state) => {
    let popupState = state.popups.stack[state.popups.stack.length - 1];
    return {
        ...popupState.authEditing,
    };
};

const mapDispatchToProps = {
    setLogin,
    setPassword,
    setPasswordRepeat,
    registerUser,
    popPopup,
    clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);