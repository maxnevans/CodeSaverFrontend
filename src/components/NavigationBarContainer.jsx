import React from "react";
import {connect} from "react-redux";
import NavigationBar from "./NavigationBar"
import {popScreen, pushScreen } from "../store/screens/actions";

const NavigationBarContainer = (props) => {
    return <NavigationBar {...props} />;
};

const mapStateToProps = (state) => {
    return {
        stack: state.screens.stack
    };
};

const mapActionsToProps = {
    popScreen,
    pushScreen
};

export default connect(mapStateToProps, mapActionsToProps)(NavigationBarContainer);