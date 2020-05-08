export const PUSH_POPUP = "popups/PUSH_POPUP";
export const POP_POPUP = "popups/POP_POPUP";

export const pushPopup = (popup, options = null) => {
    return {
        type: PUSH_POPUP,
        payload: options,
        popupType: popup
    };
};

export const popPopup = () => {
    return {
        type: POP_POPUP
    };
};