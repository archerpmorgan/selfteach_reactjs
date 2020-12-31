import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllBookData } from './actions/bookdata';
import { getAllProblemSetData } from './actions/problemsetdata';
import Navbar from "./components/Navbar/Navbar";
import About from "./components/Pages/About"
import CurrentProblemSet from "./components/Pages/ProblemSet/CurrentProblemSet"
import MyData from "./components/Pages/MyData/MyData"
import Editor from "./components/Pages/Editor/Editor"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  dispatch(getAllProblemSetData());
  dispatch(getAllBookData());

  return (
    <div className="App">
      <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={About}/>
            <Route path="/about" exact component={About}/>
            <Route path="/mydata" component={MyData}/>
            <Route path="/currentproblemset" component={CurrentProblemSet}/>
            <Route path="/editor" component={Editor}/>
          </Switch>
      </Router> 
    </div>
  );
};

export default App;
