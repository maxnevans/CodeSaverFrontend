export const REQUIRE_AUTHENTICATION = "REQUIRE_AUTHENTICATION";
export const RESET_APP = "RESET_APP";
export const REPORT_RESET_APP = "RESET_APP";
export const CLEAR_APP = "CLEAR_APP";

export const requireAuthentication = () => {
    return {
        type: REQUIRE_AUTHENTICATION,
    };
};

export const resetApp = () => {
    return {
        type: RESET_APP
    };
};

export const clearApp = () => {
    return {
        type: CLEAR_APP
    };
};

export const reportResetApp = () => {
    return {
        type: REPORT_RESET_APP,
    };
};