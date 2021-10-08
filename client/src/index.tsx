import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import appReducer from "./reducers/appReducer";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./ActiveDirectoryConfig"
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

// Component
const AppProvider = () => (
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <App />
    </Provider>
  </MsalProvider>
);

ReactDOM.render(<AppProvider />, document.getElementById("root"));
