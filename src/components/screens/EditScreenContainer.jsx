import React from "react";
import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../store/screens/actions";
import EditScreen from "./EditScreen"

const EditScreenContainer = (props) => {
    return <EditScreen {...props} />;
};

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
        user: state.user,
        didSave: screenState.codeSampleEdit.api.didSave,
        error: screenState.codeSampleEdit.api.error,
        codeSampleEdit: screenState.codeSampleEdit,
    };
};

const mapActionsToProps = {
    pushScreen,
    popScreen,
};

export default connect(mapStateToProps, mapActionsToProps)(EditScreenContainer);