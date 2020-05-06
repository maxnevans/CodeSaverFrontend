import {connect} from "react-redux";
import {popPopup} from "../../../store/popups/actions";
import {registerUser} from "../../../store/user/actions";
import {setLogin, setPassword, setPasswordRepeat} from "../../../store/popups/auth/register/actions";
import RegisterForm from "./RegisterForm"

const RegisterFormContainer = (props) => {
    return <RegisterForm {...props} />;
};

const mapStateToProps = (state) => {
    let popupState = state.popups[state.popups.length - 1];
    return {
        ...popupState.authEditing,
    };
};

const mapActionsToProps = {
    setLogin,
    setPassword,
    setPasswordRepeat,
    registerUser,
    popPopup
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterFormContainer);