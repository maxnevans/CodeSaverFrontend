export const PUSH_SCREEN = 'screens/PUSH_SCREEN';
export const POP_SCREEN = 'screens/POP_SCREEN';

export const pushScreen = (screen) => {
    // TODO: Should call screen reducer to create screen state as payload
    return {
        type: PUSH_SCREEN,
        payload: screen
    };
};

export const popScreen = () => {
    return {
        type: POP_SCREEN
    };
};