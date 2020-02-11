import React, { Component } from "react";
import List from "./code_samples/List";
import CodeSampleCreator from "./code_samples/CodeSampleCreator";

class App extends Component {
    render() {
        return (
            <div className="app">
                <CodeSampleCreator />
                <List />
            </div>
        );
    }
}

export default App;