import {connect} from "react-redux";
import App from "./App";
import {popScreen, pushScreen } from "../store/screens/actions";

const mapStateToProps = (state) => {
    return {
        screens: state.screens,
        popups: state.popups,
        user: state.user.user,
    };
};

const mapDispatchToProps = {
    popScreen,
    pushScreen
};

export default connect(mapStateToProps, mapDispatchToProps)(App);