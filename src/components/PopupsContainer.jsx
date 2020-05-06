import React from "react";
import {connect} from "react-redux";
import Popups from "./Popups"
import {pushPopup, popPopup} from "../store/popups/actions";

const PopupsContainer = (props) => {
    return <Popups {...props} />;
};

const mapStateToProps = (state) => {
    return {
        stack: state.popups.stack,
        currentPopup: state.popups.stack[state.popups.stack.length - 1]
    };
};

const mapActionsToProps = {
    popPopup,
    pushPopup,
};

export default connect(mapStateToProps, mapActionsToProps)(PopupsContainer);