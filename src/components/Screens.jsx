import React, { PureComponent } from "react";
import MainScreen from "./screens/MainScreenContainer";
import EditScreen from "./screens/EditScreenContainer";
import UserProfileScreen from "./screens/UserProfileScreenContainer";
import { MAIN_SCREEN, EDIT_SCREEN, USER_PROFILE_SCREEN } from "./ScreenType";
import PropTypes from "prop-types";

class Screens extends PureComponent {
    static propTypes = {
        //stack: PropTypes.arrayOf(PropTypes.object).isRequired,
        currentScreen: PropTypes.object,
    };

    _getScreen(type) {
        switch (type) {
            case MAIN_SCREEN:
                return <MainScreen />;
            case EDIT_SCREEN:
                return <EditScreen />;
            case USER_PROFILE_SCREEN:
                return <UserProfileScreen />;
        }
        return null;
    }

    render() {
        if (this.props.currentScreen == null)
            return null;

        const screen = this._getScreen(this.props.currentScreen.screenType);

        return (
            <div className="screen">
                {screen}
            </div>
        );
    }
}

export default Screens;