export default class Queries {
    static AUTHORIZE = (login, password) => ({
        query: `
            mutation Authorize($login: String!, $password: String!){
                user: authorize(login: $login, password: $password) {
                    id
                    login
                    name
                    secondName
                    avatars {
                        id
                        url
                    }
                }
            }
        `,
        variables: {login, password}
    });

    static REGISTER = (login, password) => ({
        query: `
            mutation Register($login: String!, $password: String!){
                user: register(login: $login, password: $password) {
                    id
                    login
                    name
                    secondName
                    avatars {
                        id
                        url
                    }
                }
            }
        `,
        variables: {login, password}
    });

    static UNAUTHORIZE = () => ({
        query: `
            mutation Unauthorize {
                success: unauthorize
            }
        `
    });

    static CODE = (id) => ({
        query: `
            query Code($id: Int!){
                code(id: $id) {
                    id
                    name
                    data: code
                    createdTime
                    editedTime
                    author {
                        id
                        name
                        secondName
                        login
                        avatars {
                            id
                            url
                        }
                    }
                    mods {
                        isReadPrivate
                        isWritePrivate
                    }
                }
            }
        `,
        variables: {id}
    });

    static CODE_LIST = () => ({
        query: `
            query CodeList {
                codeList {
                    id
                    name
                    createdTime
                    editedTime
                    mods {
                        isReadPrivate
                        isWritePrivate
                    }
                    author {
                        id
                        name
                        secondName
                        login
                        avatars {
                            id
                            url
                        }
                    }
                }
            }
        `
    });

    static CODE_HISTORY = (id) => ({
        query: `
            query CodeHistory($id: Int!) {
                codeHistory(id: $id) {
                    user {
                        login
                        name
                        last
                        id
                        avatars {
                            url
                        }
                    }
                    time
                    type
                }
            }
        `,
        variables: {id}
    });

    static CREATE_CODE = (name, code, mods) => ({
        query: `
            mutation CreateCode($name: String!, $code: String!, $isReadPrivate: Boolean, $isWritePrivate: Boolean) {
                code: createCode(name: $name, code: $code, mods: {
                    isReadPrivate: $isReadPrivate
                    isWritePrivate: $isWritePrivate
                }) {
                    id
                    name
                    createdTime
                    editedTime
                    mods {
                        isReadPrivate
                        isWritePrivate
                    }
                    author {
                        id
                        name
                        secondName
                        login
                        avatars {
                            id
                            url
                        }
                    }
                }
            }
        `,
        variables: {name, code, isReadPrivate: mods.isReadPrivate, isWritePrivate: mods.isWritePrivate}
    });

    static EDIT_CODE = (id, name, code, mods) => ({
        query: `
            mutation EditCode($id: Int!, $name: String, $code: String, $isReadPrivate: Boolean, $isWritePrivate: Boolean) {
                code: editCode(id: $id, name: $name, code: $code, mods: {
                    isReadPrivate: $isReadPrivate
                    isWritePrivate: $isWritePrivate
                }) {
                    id
                    name
                    createdTime
                    editedTime
                    data: code
                    mods {
                        isReadPrivate
                        isWritePrivate
                    }
                    author {
                        id
                        name
                        secondName
                        login
                        avatars {
                            id
                            url
                        }
                    }
                }
            }
        `,
        variables: {id, name, code, isReadPrivate: mods.isReadPrivate, isWritePrivate: mods.isWritePrivate}
    });

    static DELETE_CODE = (id) => ({
        query: `
            mutation DeleteCode($id: Int!) {
                success: deleteCode(id: $id)
            }
        `,
        variables: {id}
    });

    static SET_CODE_MODS = (id, mods) => ({
        query: `
            mutation SetCodeMods($id: Int! $mods: CodeSampleModsInput!) {
                mods: setCodeMods(id: $id, mods: $mods) {
                    isPrivateRead
                    isPrivateWrite
                }
            }
        `,
        variables: {id, mods}
    });

    static CODE_MODS = (id) => ({
        query: `
            query CodeMods($id: Int!) {
                mods: codeMods(id: $id) {
                    isPrivateRead
                    isPrivateWrite
                }
            }
        `,
        variables: {id}
    });

    static USER = (id) => ({
        query: `
            query User($id: Int) {
                user(id: $id) {
                    id
                    name
                    secondName
                    login
                    avatars {
                        id
                        url
                    }
                }
            }
        `,
        variables: {id}
    });

    static FETCH_PASSWORD = () => ({
        query: `
            query FetchPassword {
                password: fetchPassword
            }
        `
    });

    static EDIT_USER = (name, secondName, login, avatarIds) => ({
        query: `
            mutation EditUser($name: String, $secondName: String, $login: String, $avatarIds: [Int!]) {
                user: editUser(data: {
                    name: $name
                    secondName: $secondName
                    login: $login
                    avatars: $avatarIds
                }) {
                    id
                    login
                    name
                    secondName
                    avatars {
                        id
                        url
                    }
                }
            }
        `,
        variables: {name, secondName, login, avatarIds}
    });

    static SET_USER_AVATARS = (avatarIds) => ({
        query: `
            mutation PushUserAvatar($avatarIds: [Int!]) {
                success: pushUserAvatar(avatars: $avatarIds)
            }
        `,
        variables: {avatarIds}
    });

    static UNSET_USER_AVATARS = () => ({
        query: `
            mutation UnsetUserAvatars {
                success: unserUserAvatars
            }
        `
    });

    static EDIT_PASSWORD = (password) => ({
        query: `
            mutation EditPassword($password: String!) {
                success: editPassword(password: $password)
            }
        `,
        variables: {password}
    });
}