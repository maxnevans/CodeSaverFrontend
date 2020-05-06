import React from "react";
import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../../store/screens/actions";
import {editCodeSample, deleteCodeSample} from "../../../store/screens/main-screen/code-samples-list/code-sample/actions";
import Item from "./Item"

const CodeSampleItemContainer = (props) => {
    return <Item {...props} />;
};

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
    };
};

const mapActionsToProps = {
    pushScreen,
    popScreen,
    editCodeSample,
    deleteCodeSample
};

export default connect(mapStateToProps, mapActionsToProps)(CodeSampleItemContainer);