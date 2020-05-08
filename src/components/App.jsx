import React, { PureComponent } from "react";
import Screens from './ScreensContainer';
import Popups from './PopupsContainer';
import UserBar from './UserBarContainer';
import NavigationBar from "./NavigationBarContainer";
import PropTypes from "prop-types";

class App extends PureComponent {
    static propTypes = {
        user: PropTypes.object,
    };

    render() {
        const userBar = this.props.user ? <UserBar /> : null;
        return (
            <div className="app">
                <div className="navigation">
                    <NavigationBar />
                    {userBar}
                </div>
                <Popups />
                <Screens />
            </div>
        );
    }
}

export default App;