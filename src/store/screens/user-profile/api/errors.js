export const SAVE_ERROR = "SAVE_ERROR";
export const DELETE_ERROR = "DELETE_ERROR";
export const FETCH_ERROR = "FETCH_ERROR";
export const UPLOAD_AVATAR_ERROR = "UPLOAD_AVATAR_ERROR";

export const createSaveError = (message = "Failed to save user to database!") => {
    return {
        type: SAVE_ERROR,
        message
    };
};

export const createDeleteError = (message = "Failed to delete user!") => {
    return {
        type: DELETE_ERROR,
        message,
    };
};

export const createFetchError = (message = "Failed to fetch user from database!") => {
    return {
        type: FETCH_ERROR,
        message,
    };
};

export const createUploadAvatarError = (message = "Failed to upload avatar!") => {
    return {
        type: UPLOAD_AVATAR_ERROR,
        message,
    };
};