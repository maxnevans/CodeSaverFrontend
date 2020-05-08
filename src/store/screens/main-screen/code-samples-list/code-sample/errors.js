export const DELETE_ERROR = "DELETE_ERROR";

export const createDeletError = (message = "Failed to delete item from list!") => {
    return {
        type: DELETE_ERROR,
        message,
    };
};