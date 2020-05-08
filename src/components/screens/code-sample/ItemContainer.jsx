import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../../store/screens/actions";
import {editCodeSample, deleteCodeSample} from "../../../store/screens/main-screen/code-samples-list/code-sample/actions";
import Item from "./Item";

const mapStateToProps = (state) => ({
    user: state.user.user,
});

const mapDispatchToProps = {
    pushScreen,
    popScreen,
    editCodeSample,
    deleteCodeSample
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);