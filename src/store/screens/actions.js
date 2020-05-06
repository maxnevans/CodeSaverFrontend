export const PUSH_SCREEN = 'push-screen';
export const POP_SCREEN = 'pop-screen';

export const pushScreen = (screen) => {
    // TODO: Should call screen reducer to create screen state as payload
    return {
        type: PUSH_SCREEN,
        payload: screen
    }
};

export const popScreen = () => {
    return {
        type: POP_SCREEN
    };
};