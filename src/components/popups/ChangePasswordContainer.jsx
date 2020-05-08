import {connect} from "react-redux";
import ChangePassword from "./ChangePassword";
import {fetchPassword, setOldPassword, 
    setPassword, setPasswordRepeat, clearError, changePassword} from "../../store/popups/password-change/actions";
import {popPopup} from "../../store/popups/actions";

const mapStateToProps = (state) => {
    const popupState = state.popups.stack[state.popups.stack.length - 1];
    console.log(popupState);
    return {
        ...popupState,
    };
};

const mapDispatchToProps = {
    fetchPassword,
    setOldPassword,
    setPassword,
    setPasswordRepeat,
    clearError,
    changePassword,
    popPopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);