import {connect} from "react-redux";
import NavigationBar from "./NavigationBar";
import {popScreen, pushScreen } from "../store/screens/actions";

const mapStateToProps = (state) => {
    return {
        stack: state.screens.stack
    };
};

const mapDispatchToProps = {
    popScreen,
    pushScreen
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);