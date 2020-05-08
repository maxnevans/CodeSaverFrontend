import APICore, { APILogicError } from "./api-core";
import Queries from "./queries";
import {UPLOAD_CODE_SAMPLE, UPLOAD_USER} from "./destiantions";
import DataSource from "../components/screens/code-sample/editor-data/DataSource";

export default class API extends APICore {
    static async getCodeSamples() {
        const data = await APICore.graph(Queries.CODE_LIST());
        if (!Array.isArray(data.codeList))
            throw new APILogicError("Code list is not an array of code samples");
        return data.codeList;
    }

    static async getCodeSample(id) {
        const data = await APICore.graph(Queries.CODE(parseInt(id)));
        return data.code;
    }

    static async editCodeSample(codeSample) {
        if (codeSample.type == DataSource.SOURCE_TEXT) {
            
            return (await APICore.graph(Queries.EDIT_CODE(parseInt(codeSample.id), codeSample.name, codeSample.data, codeSample.mods))).code;
        }
        else if (codeSample.type == DataSource.SOURCE_FILES) {
            return await APICore.upload(UPLOAD_CODE_SAMPLE, {
                id: codeSample.id,
            }, {
                "code-files": codeSample.data,
                "code-name": codeSample.name,
            });
        }

        throw new Error("Undefined data type!");
    }

    static async createCodeSample(codeSample) {
        if (codeSample.type == DataSource.SOURCE_TEXT) {
            return (await APICore.graph(Queries.CREATE_CODE(codeSample.name, codeSample.data, codeSample.mods))).code;
        } else if (codeSample.type == DataSource.SOURCE_FILES) {
            return await APICore.upload(UPLOAD_CODE_SAMPLE, null, {
                "code-files": codeSample.data,
                "code-name": codeSample.name
            });
        }

        throw new Error("Undefined data type!");
    }

    static async deleteCodeSample(codeSample) {
        return (await APICore.graph(Queries.DELETE_CODE(parseInt(codeSample.id)))).success;
    }

    static async getCodeSampleMods(codeSample) {
        return (await APICore.graph(Queries.CODE_MODS(codeSample.id))).mods;
    }

    static async setCodeSampleMods(codeSample, mods) {
        return (await APICore.graph(Queries.SET_CODE_MODS(codeSample.id), mods)).mods;
    }

    static async registerUser(user) {
        console.log(user);
        return (await APICore.graph(Queries.REGISTER(user.login, user.password))).user;
    }

    static async loginUser(user) {
        return (await APICore.graph(Queries.AUTHORIZE(user.login, user.password))).user;
    }

    static async logoutUser() {
        return (await APICore.graph(Queries.UNAUTHORIZE())).success;
    }

    static async getUser(user) {
        return (await APICore.graph(Queries.USER(user?.id))).user;
    }

    static async editUser(user) {
        return (await APICore.graph(Queries.EDIT_USER(user.name, user.secondName, user.login, user.avatars?.map(avatar => avatar.id) ?? null))).user;
    }

    static async uploadAvatar(file) {
        return await APICore.upload(UPLOAD_USER, null, {"avatar": file});
    }

    static async setUserAvatars(avatars) {
        return (await APICore.graph(Queries.SET_USER_AVATARS(avatars.map(avatar => avatar.id)))).success;
    }

    static async unsetUserAvatars() {
        return (await APICore.graph(Queries.UNSET_USER_AVATARS())).success;
    }

    static async fetchUserPassword() {
        return (await APICore.graph(Queries.FETCH_PASSWORD())).password;
    }

    static async editUserPassword(password) {
        return (await APICore.graph(Queries.EDIT_PASSWORD(password))).success;
    }
}