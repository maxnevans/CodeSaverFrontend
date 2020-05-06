import React, { PureComponent } from "react";
import Screens from './ScreensContainer';
import Popups from './PopupsContainer';
import UserBar from './UserBarContainer';
import NavigationBar from "./NavigationBarContainer";
import { MAIN_SCREEN } from "./ScreenType";

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.props.pushScreen(MAIN_SCREEN);
    }

    render() {
        const userBar = this.props.user?.user ? <UserBar /> : null;
        return (
            <div className="app">
                <NavigationBar />
                {userBar}
                <Popups />
                <Screens />
            </div>
        );
    }
}

export default App;