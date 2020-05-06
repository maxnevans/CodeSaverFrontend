export const PUSH_POPUP = "popups/PUSH";
export const POP_POPUP = "popups/POP";

export const pushPopup = (popup) => {
    return {
        type: PUSH_POPUP,
        payload: popup
    };
};

export const popPopup = () => {
    return {
        type: POP_POPUP
    };
};