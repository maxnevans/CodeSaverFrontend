import {connect} from "react-redux";
import UserProfileScreen from "./UserProfileScreen";
import {fetchUser, saveUser, deleteUser, uploadAvatar, clearDidSave} from "../../store/screens/user-profile/api/actions";
import {setName, setSecondName, setLogin, setAvatars, deleteAvatars, changePassword, setUser} from "../../store/screens/user-profile/editing/actions";
import cloneDeep from "lodash.clonedeep";

const mapStateToProps = (state) => {
    const screenState = state.screens.stack[state.screens.stack.length - 1];
    const copy = cloneDeep(screenState);
    copy.api.user = state.user?.user;
    return copy;
};

const mapDispatchToProps = {
    saveUser,
    deleteUser,
    fetchUser,
    setName,
    setSecondName,
    setLogin,
    changePassword,
    setAvatars,
    deleteAvatars,
    uploadAvatar,
    setUser,
    clearDidSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);