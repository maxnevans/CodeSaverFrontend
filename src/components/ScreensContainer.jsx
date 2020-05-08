import {connect} from "react-redux";
import Screens from "./Screens";
import {popScreen, pushScreen } from "../store/screens/actions";

const mapStateToProps = (state) => {
    return {
        stack: state.screens.stack,
        currentScreen: state.screens.stack[state.screens.stack.length - 1],
    };
};

const mapDispatchToProps = {
    popScreen,
    pushScreen
};

export default connect(mapStateToProps, mapDispatchToProps)(Screens);