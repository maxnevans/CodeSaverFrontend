import React from "react";
import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../../store/screens/actions";
import Editor from "./Editor"
import {fetchCodeSample, saveCodeSample, deleteCodeSample} from "../../../store/screens/common/code-sample-edit/api/actions"
import {setCodeSampleName, setCodeSampleData} from "../../../store/screens/common/code-sample-edit/editing/actions"

const EditorContainer = (props) => {
    return <Editor {...props} />;
};

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
    };
};

const mapActionsToProps = {
    pushScreen,
    popScreen,
    fetchCodeSample,
    saveCodeSample,
    deleteCodeSample,
    setCodeSampleName,
    setCodeSampleData,
};

export default connect(mapStateToProps, mapActionsToProps)(EditorContainer);