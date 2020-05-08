import {connect} from "react-redux";
import {pushScreen, popScreen} from "../../../store/screens/actions";
import Editor from "./Editor";
import {fetchCodeSample, saveCodeSample, deleteCodeSample} from "../../../store/screens/common/code-sample-edit/api/actions";
import {setCodeSampleName, setCodeSampleData, updateMods} from "../../../store/screens/common/code-sample-edit/editing/actions";
import {setError, clearError, setDidSave, setDidFetch, setDidDelete, 
    clearDidSave, clearDidFetch, clearDidDelete} from "../../../store/screens/common/code-sample-edit/api/actions";

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = {
    pushScreen,
    popScreen,
    fetchCodeSample,
    saveCodeSample,
    deleteCodeSample,
    setCodeSampleName,
    setCodeSampleData,
    setError,
    clearError,
    setDidSave,
    setDidFetch,
    setDidDelete,
    clearDidSave,
    clearDidFetch,
    clearDidDelete,
    updateMods
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);