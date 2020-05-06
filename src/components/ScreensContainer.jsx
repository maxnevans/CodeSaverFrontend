import React from "react";
import {connect} from "react-redux";
import Screens from "./Screens"
import {popScreen, pushScreen } from "../store/screens/actions";

const ScreensContainer = (props) => {
    return <Screens {...props} />;
};

const mapStateToProps = (state) => {
    return {
        stack: state.screens.stack,
        currentScreen: state.screens.stack[state.screens.stack.length - 1]
    };
};

const mapActionsToProps = {
    popScreen,
    pushScreen
};

export default connect(mapStateToProps, mapActionsToProps)(ScreensContainer);