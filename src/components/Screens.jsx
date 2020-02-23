import React, { PureComponent } from "react";
import Popups from "./Popups";
import MainScreen from "./screens/MainScreen";
import EditScreen from "./screens/EditScreen";

class Screens extends PureComponent {
    static MAIN_SCREEN = 'main';
    static EDIT_SCREEN = 'edit';

    constructor(props) {
        super(props);

        this.state = {
            codeSamplesList: []
        };

        this.goBackHandler = this.goBackHandler.bind(this);
        this.goForwardHandler = this.goForwardHandler.bind(this);
        this.unauthorizedHandler = this.unauthorizedHandler.bind(this);
        this.codeSampleEditHandler = this.codeSampleEditHandler.bind(this);
        this.codeSampleSaveHandler = this.codeSampleSaveHandler.bind(this);
        this.changeCodeSamplesHandler = this.changeCodeSamplesHandler.bind(this);
    }

    changeCodeSamplesHandler(codeSamplesList) {
        this.setState({codeSamplesList});
    }

    getCurrentScreenItem(currentScreen, currentScreenData) {
        switch(currentScreen) {
            case Screens.MAIN_SCREEN:
                return <MainScreen
                    onUnauthorized={this.unauthorizedHandler}
                    onCodeSampleEdit={this.codeSampleEditHandler}
                    codeSamples={this.state.codeSamplesList}
                    onCodeSamplesChange={this.changeCodeSamplesHandler}
                    user={this.props.user}
                />;
            case Screens.EDIT_SCREEN:
                return <EditScreen
                    onUnauthorized={this.unauthorizedHandler}
                    codeSampleId={currentScreenData}
                    onCodeSampleSave={this.codeSampleSaveHandler}
                    user={this.props.user}
                />;
        }
    }

    goForwardHandler(nextScreen, data, shouldClearHistory) {
        let screens = this.props.screens.slice();

        if (shouldClearHistory) {
            screens = [{screen: nextScreen, data: data}];
        } else {
            screens.push({screen: nextScreen, data: data});
        }

        this.props.onScreensChange(screens);
    }

    goBackHandler() {
        let screens = this.props.screens.slice();

        if (screens.length > 1) {
            screens = screens.slice(0, -1);

            this.props.onScreensChange(screens);
        }
    }

    unauthorizedHandler() {
        this.props.onPopupRequest(Popups.LOGIN_POPUP);
    }

    codeSampleEditHandler(sampleId) {
        this.goForwardHandler(Screens.EDIT_SCREEN, sampleId);
    }

    codeSampleSaveHandler(codeSample) {
        this.setState(state => {
            const codeSamplesList = state.codeSamplesList.slice();

            codeSamplesList.map(code => {
                if (code.id != codeSample.id)
                    return code;

                return codeSample;
            });

            return {codeSamplesList};
        });

        this.goBackHandler();
    }

    render() {
        const currentScreen = this.props.screens[this.props.screens.length - 1];
        const screenItem = this.getCurrentScreenItem(currentScreen.screen, currentScreen.data);

        const backButtonItem = this.props.screens.length > 1 ? <button onClick={this.goBackHandler}>Go Back</button> : null;

        return (
            <div className="screens">
                {backButtonItem}
                {screenItem}
            </div>
        );
    }
}

export default Screens;