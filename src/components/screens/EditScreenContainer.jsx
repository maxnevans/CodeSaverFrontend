import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../store/screens/actions";
import EditScreen from "./EditScreen";

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    return {
        user: state.user,
        codeSampleEdit: screenState.codeSampleEdit,
    };
};

const mapDispatchToProps = {
    pushScreen,
    popScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);