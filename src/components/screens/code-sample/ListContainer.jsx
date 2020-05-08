import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../../store/screens/actions";
import {fetchCodeSamples} from "../../../store/screens/main-screen/code-samples-list/actions";
import List from "./List";

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
        user: state.user.user,
        codeSamples: screenState.codeSamplesList.codeSamples
    };
};

const mapDispatchToProps = {
    pushScreen,
    popScreen,
    fetchCodeSamples,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);