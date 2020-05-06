import {connect} from "react-redux";
import {pushPopup, popPopup} from "../../store/popups/actions";
import {switchType} from "../../store/popups/auth/actions";
import AuthPopup from "./Auth"

const AuthPopupContainer = (props) => {
    return <AuthPopup {...props}
        />;
};

const mapStateToProps = (state) => {
    return {
        authType: state.popups[state.popups.length - 1].authType,
        authEditing: state.popups[state.popups.length - 1].authEditing,
        user: state.user.user,
        error: state.user.error,
    };
};

const mapActionsToProps = {
    pushPopup,
    popPopup,
    switchType,
};

export default connect(mapStateToProps, mapActionsToProps)(AuthPopupContainer);