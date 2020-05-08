export const FETCH_CODE_SAMPLES_ERROR = "FETCH_CODE_SAMPLES_ERROR";

export const createFetchCodeSamplesError = (message = "Failed to fetch code samples!") => {
    return {
        type: FETCH_CODE_SAMPLES_ERROR,
        message,
    };
};