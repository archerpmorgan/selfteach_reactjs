import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBookData } from "./actions/bookdata";
import { getAllProblemSetData } from "./actions/problemsetdata";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/Pages/About";
import CurrentProblemSet from "./components/Pages/ProblemSet/CurrentProblemSet";
import MyData from "./components/Pages/MyData/MyData";
import Editor from "./components/Pages/Editor/Editor";
import NewBook from "./components/Pages/NewBook/NewBook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "msal";
import { accessTokenRequest } from "./ActiveDirectoryConfig";
import "./App.css";

const App = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = useState("");

  let token = "";
  if (account) {
    instance.acquireTokenSilent({
      ...accessTokenRequest,
      account: account,
    })
    .then(function (accessTokenResponse) {
      // Acquire token silent success
      // Call API with token
      let token = accessTokenResponse.accessToken;
      setAccessToken(token);
    })
    .catch(function (error) {
      //Acquire token silent failure, and send an interactive request
      if (error instanceof InteractionRequiredAuthError) {
        console.log(error);
        console.log("got here");
        instance.acquireTokenRedirect({
          ...accessTokenRequest,
          account: account,
        }).then((token) => {
          console.log(token);
        });
      }
    });
  }  

  console.log(accessToken)

  const dispatch = useDispatch();
  dispatch(getAllProblemSetData());
  dispatch(getAllBookData());

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={About} />
          <Route path="/about" exact component={About} />
          <Route path="/mydata" component={MyData} />
          <Route path="/currentproblemset" component={CurrentProblemSet} />
          <Route path="/editor" component={Editor} />
          <Route path="/newbook" component={NewBook} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
