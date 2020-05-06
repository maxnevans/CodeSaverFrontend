import React from "react";
import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../store/screens/actions";
import MainScreen from "./MainScreen"

const MainScreenContainer = (props) => {
    return <MainScreen {...props} />;
};

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
        newCodeSample: screenState.newCodeSample
    };
};

const mapActionsToProps = {
    pushScreen,
    popScreen,
};

export default connect(mapStateToProps, mapActionsToProps)(MainScreenContainer);