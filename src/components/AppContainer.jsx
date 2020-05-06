import React from "react";
import {connect} from "react-redux";
import App from "./App"
import {popScreen, pushScreen } from "../store/screens/actions";

const AppContainer = (props) => {
    return <App {...props} />;
};

const mapStateToProps = (state) => {
    return {
        screens: state.screens,
        popups: state.popups,
        user: state.user.user,
    };
};

const mapActionsToProps = {
    popScreen,
    pushScreen
};

export default connect(mapStateToProps, mapActionsToProps)(AppContainer);