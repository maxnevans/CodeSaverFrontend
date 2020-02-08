const DEFAULT_PROTO = 'http';
const DEFAULT_PORT = '8080';
const DEFAULT_HOST = 'localhost';

const SOURCE = `${DEFAULT_PROTO}://${DEFAULT_HOST}:${DEFAULT_PORT}`;
const API_SOURCE = SOURCE + '/api';

export const GET_LIST = {
    url: () => API_SOURCE + '/list',
    method: 'get'
};

export const GET_CODE = {
    url: (details) => API_SOURCE + '/code/' + details[0],
    method: 'get'
};

export const EDIT_CODE = {
    url: (details) => API_SOURCE + '/code/' + details[0],
    method: 'put'
};

export const CREATE_CODE = {
    url: () => API_SOURCE + '/code/create',
    method: 'post'
};

export const UPLOAD_CODE = {
    url: () => API_SOURCE + '/code/upload',
    method: 'post'
};