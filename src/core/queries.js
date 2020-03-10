export default class Queries {
    static AUTH_INFO = () => ({
        query: `
            query AuthInfo{
                authInfo {
                    id
                    token
                }
            }
        `
    });

    static AUTHORIZE = (login, password) => ({
        query: `
            mutation Authorize($login: String, $password: String){
                authorize(login: $login, password: $password) {
                    id
                    token
                }
            }
        `,
        variables: {login, password}
    });

    static ACCOUNT = () => ({
        query: `
            query Account{
                user: account {
                    id
                    login
                    password
                }
            }
        `
    });

    static REGISTER = (login, password) => ({
        query: `
            mutation Register($login: String, $password: String){
                user: register(login: $login, password: $password) {
                    id
                    login
                    password
                }
            }
        `,
        variables: {login, password}
    });

    static UNAUTHORIZE = () => ({
        query: `
            mutation Unauthorize {
                unauthorize
            }
        `
    });

    static CODE = (id) => ({
        query: `
            query Code($id: Int){
                code(id: $id) {
                    id
                    name
                    code
                    created_time: createdTime
                    edited_time: editedTime
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
                    created_time: createdTime
                    edited_time: editedTime
                }
            }
        `
    });

    static CREATE_CODE = (name, code) => ({
        query: `
            mutation CreateCode($name: String, $code: String) {
                id: createCode(name: $name, code: $code)
            }
        `,
        variables: {name, code}
    });

    static EDIT_CODE = (id, name, code) => ({
        query: `
            mutation EditCode($id: Int, $name: String, $code: String) {
                editCode(id: $id, name: $name, code: $code)
            }
        `,
        variables: {id, name, code}
    });

    static DELETE_CODE = (id) => ({
        query: `
            mutation DeleteCode($id: Int) {
                deleteCode(id: $id)
            }
        `,
        variables: {id}
    });

}