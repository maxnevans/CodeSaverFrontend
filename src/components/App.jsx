import React, { PureComponent } from "react";
import Screens from './Screens';
import Popups from './Popups';
import UserBar from './common/UserBar';
import coreApp from "../core/app";
import QueryHandler from "../core/query-handler";
import HttpCodes from "../core/http-codes";

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            screens: [{screen: Screens.MAIN_SCREEN, data: null}],
            popups: [],
            user: {}
        };
        
        this.popupRequestHandler = this.popupRequestHandler.bind(this);
        this.screenRequestHandler = this.screenRequestHandler.bind(this);
        this.popupsChangeHandler = this.popupsChangeHandler.bind(this);
        this.screensChangeHandler = this.screensChangeHandler.bind(this);
        this.userChangeHandler = this.userChangeHandler.bind(this);
        this.signOutHandler = this.signOutHandler.bind(this);
    }

    signOutHandler() {
        const qh = new QueryHandler();

        qh.setupHandler(HttpCodes.OK, () => {
            coreApp.autologin(false);
            this.setState({user: {}});
        });
        
        coreApp.prepareToQuery(qh).logoutUser();
    }

    componentDidMount() {
        const qh = new QueryHandler();

        qh.setupHandler(HttpCodes.OK, (httpCode, body) => {
            if (body.data.user == null)
                return;

            const user = body.data.user;
            const qhAuth = new QueryHandler();

            qhAuth.setupHandler(HttpCodes.OK, (httpCode, body) => {
                const {token} = body.data.authInfo;
                coreApp.authenticateSocket(user.id, token);
            });

            coreApp.prepareToQuery(qhAuth).getAuthInfo();

            this.setState({user: body.data.user});
        });

        coreApp.prepareToQuery(qh).testAuth();
    }

    popupsChangeHandler(popups) {
        this.setState({popups});
    }

    screensChangeHandler(screens) {
        this.setState({screens: screens});
    }

    userChangeHandler(userData) {
        this.setState(state => ({user: {...state.user, ...userData}}));
    }

    screenRequestHandler(screenType, screenData) {
        this.setState(state => {
            const screens = state.screens.slice();
            const newScreen = {screen: screenType, data: screenData};

            screens.push(newScreen);

            return {screens};
        });
    }

    popupRequestHandler(popupType, popupData) {
        this.setState(state => {
            const popups = state.popups.slice();
            const newPopup = {popup: popupType, data: popupData};

            popups.splice(0, 0, newPopup);
            return {popups};
        });
    }

    render() {
        const userBar = this.state.user.login ? <UserBar login={this.state.user.login} onSignOut={this.signOutHandler}/> : null;

        return (
            <div className="app">
                <h1>Code Saver</h1>
                {userBar}
                <Popups 
                    popups={this.state.popups} 
                    user={this.state.user}
                    onPopupsChange={this.popupsChangeHandler}
                    onScreenRequest={this.screenRequestHandler}
                    onUserChange={this.userChangeHandler}
                />
                <Screens 
                    screens={this.state.screens} 
                    user={this.state.user}
                    onScreensChange={this.screensChangeHandler} 
                    onPopupRequest={this.popupRequestHandler}
                    onUserChange={this.userChangeHandler}
                />
            </div>
        );
    }
}

export default App;