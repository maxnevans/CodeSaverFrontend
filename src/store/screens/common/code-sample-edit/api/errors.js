export const SAVE_ERROR = "SAVE_ERROR";
export const DELETE_ERROR = "DELETE_ERROR";
export const FETCH_ERROR = "FETCH_ERROR";

export const createSaveError = (message = "Failed to save code to database!") => {
    return {
        type: SAVE_ERROR,
        message
    };
};

export const createDeleteError = (message = "Failed to delete code sample!") => {
    return {
        type: DELETE_ERROR,
        message,
    };
};

export const createFetchError = (message = "Failed to fetch code sample from database!") => {
    return {
        type: FETCH_ERROR,
        message,
    };
};