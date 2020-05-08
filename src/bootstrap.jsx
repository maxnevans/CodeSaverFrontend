import "./styles/main.scss";
import "./icon.png";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./store/reducers";
import rootSaga from "./store/sagas";
import App from "./components/AppContainer";
import createSagaMiddleware from "redux-saga";
import {createLogger} from "redux-logger";
import { APIServerError, APIError, APIGraphQLError } from "./core/api-core";

window.onunhandledrejection = (event) => {
    event.preventDefault();
    console.log('Unahandled Rejection: ', event.reason);
};

const middleware = [];

if (process.env.NODE_ENV == "development") {
    const logger = createLogger();
    middleware.push(logger);
}

const sagaMiddleware = createSagaMiddleware({
    onError: (error, {}) => {
        if (error instanceof APIServerError)
            console.error("Server errors: ", error.errors);

        if (error instanceof APIGraphQLError)
            console.error("GraphQLError: ", error.errors);

        if (error instanceof APIError)
            console.error("API Error:", error.data);
        console.error(error);
    }
});
middleware.push(sagaMiddleware);

const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));