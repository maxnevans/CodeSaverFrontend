import {connect} from "react-redux";
import Popups from "./Popups";
import {pushPopup, popPopup} from "../store/popups/actions";

const mapStateToProps = (state) => {
    return {
        stack: state.popups.stack,
        currentPopup: state.popups.stack[state.popups.stack.length - 1]
    };
};

const mapDispatchToProps = {
    popPopup,
    pushPopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);