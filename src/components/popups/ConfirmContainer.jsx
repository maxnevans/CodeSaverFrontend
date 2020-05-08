import {connect} from "react-redux";
import {popPopup} from "../../store/popups/actions";
import {returnValue} from "../../store/popups/confirm/actions";
import ConfirmPopup from "./Confirm";

const mapStateToProps = (state) => {
    const popupState = state.popups.stack[state.popups.stack.length - 1];
    return {
        ...popupState,
    };
};

const mapDispatchToProps = {
    popPopup,
    returnValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPopup);