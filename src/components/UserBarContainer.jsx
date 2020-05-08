import {connect} from "react-redux";
import UserBar from "./UserBar";
import {logoutUser} from "../store/user/actions";
import {pushScreen} from "../store/screens/actions";

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        error: state.user.error,
    };
};

const mapDispatchToProps = {
    logoutUser,
    pushScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);