import React, { Component } from "react";
import List from "./code_samples/List";
import CodeSampleCreator from "./code_samples/CodeSampleCreator";
import MainScreen from "./MainScreen";
import EditScreen from "./EditScreen";

class App extends Component {
    static MAIN_SCREEN = 'main';
    static EDIT_SCREEN = 'edit';

    constructor(props) {
        super(props);

        this.state = {
            screens: [
                App.MAIN_SCREEN
            ],
            nextScreenData: null
        };

        this.goBackHandler = this.goBackHandler.bind(this);
        this.goForwardHandler = this.goForwardHandler.bind(this);
    }



    getCurrentScreen(currentScreen, currentScreenData) {
        switch(currentScreen) {
            case App.MAIN_SCREEN:
                return <MainScreen onGoForward={this.goForwardHandler} screenData={currentScreenData} />;
            case App.EDIT_SCREEN:
                return <EditScreen onGoBack={this.goBackHandler} onGoForward={this.goForwardHandler} screenData={currentScreenData} />;
        }
    }
    
    goForwardHandler(nextScreen, data, shouldClearHistory) {
        this.setState((state, props) => {

            let screens;

            if (shouldClearHistory) {
                screens = [nextScreen];
            } else {
                screens = state.screens.slice();
                screens.push(nextScreen);
            }

            return {
                screens,
                nextScreenData: data
            };
        });
    }

    goBackHandler(data) {
        this.setState((state, props) => {
            let screens = state.screens.slice();

            if (screens.length > 1)
                screens = screens.slice(0, -1);

            return {
                screens
            };
        });
    }

    render() {
        const currentScreen = this.state.screens[this.state.screens.length - 1];
        const screenItem = this.getCurrentScreen(currentScreen, this.state.nextScreenData);

        return (
            <div className="app">
                {screenItem}
            </div>
        );
    }
}

export default App;