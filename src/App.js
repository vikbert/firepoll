import React from "react";
import {Route, Switch} from 'react-router-dom';
import "./App.css";
import VotePage from "./components/vote/VotePage";
import ChartPage from "./components/chart/ChartPage";
import PollPage from "./components/poll/PollPage";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={PollPage}></Route>
        <Route path={'/vote/:slug'} component={VotePage}/>
        <Route path={'/chart/:slug'} component={ChartPage}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
