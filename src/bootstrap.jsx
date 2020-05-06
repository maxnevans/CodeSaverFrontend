import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./store/reducers";
import App from "./components/AppContainer";
import mainStyles from "./styles/main.scss";

const store = createStore(rootReducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));