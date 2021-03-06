import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../store/screens/actions";
import MainScreen from "./MainScreen";

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
        newCodeSample: screenState.newCodeSample
    };
};

const mapDispatchToProps = {
    pushScreen,
    popScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);