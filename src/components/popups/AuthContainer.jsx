import {connect} from "react-redux";
import {pushPopup, popPopup} from "../../store/popups/actions";
import {switchType} from "../../store/popups/auth/actions";
import AuthPopup from "./Auth";

const mapStateToProps = (state) => {
    const popupState = state.popups.stack[state.popups.stack.length - 1];
    return {
        ...popupState,
        user: state.user.user,
        error: state.user.error,
    };
};

const mapDispatchToProps = {
    pushPopup,
    popPopup,
    switchType,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPopup);