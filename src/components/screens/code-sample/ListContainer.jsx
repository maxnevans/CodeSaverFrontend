import React from "react";
import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../../store/screens/actions";
import {fetchCodeSamples} from "../../../store/screens/main-screen/code-samples-list/actions";
import List from "./List"

const ListContainer = (props) => {
    return <List {...props} />;
};

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
        user: state.user,
        codeSamples: screenState.codeSamplesList.codeSamples
    };
};

const mapActionsToProps = {
    pushScreen,
    popScreen,
    fetchCodeSamples,
};

export default connect(mapStateToProps, mapActionsToProps)(ListContainer);