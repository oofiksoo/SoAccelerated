import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { combinedReducer } from "./reducers/combinedReducer";
import "./index.css";
import App from "./App";

const store = createStore(combinedReducer, applyMiddleware(thunk));
const History = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={History}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
