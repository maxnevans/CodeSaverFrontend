import React from "react";
import {connect} from "react-redux";
import UserBar from "./UserBar";
import {logoutUser} from "../store/user/actions";

const UserBarContainer = (props) => {
    return <UserBar
        logoutUser={props.logoutUser} />;
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapActionsToProps = {
    logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(UserBarContainer);