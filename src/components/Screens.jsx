import React, { PureComponent } from "react";
import MainScreen from "./screens/MainScreenContainer";
import EditScreen from "./screens/EditScreenContainer";
import { MAIN_SCREEN, EDIT_SCREEN } from "./ScreenType";

class Screens extends PureComponent {
    #getScreen(type) {
        switch(type) {
            case MAIN_SCREEN:
                return <MainScreen />;
            case EDIT_SCREEN:
                return <EditScreen />;
        }
        return null;
    }

    render() {
        if (this.props.currentScreen == null)
            return null;

        const screen = this.#getScreen(this.props.currentScreen.screenType);

        return (
            <div className="screen">
                {screen}
            </div>
        );
    }
}

export default Screens;