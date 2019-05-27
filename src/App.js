import React from "react";
import {Route, Switch} from 'react-router-dom';

import "./App.css";
import VotePage from "./components/vote/VotePage";
import ChartPage from "./components/chart/ChartPage";
import HomePage from "./components/home/HomePage";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={HomePage}></Route>
        <Route path={'/vote/:slug'} component={VotePage}/>
        <Route path={'/chart/:slug'} component={ChartPage}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
      {/*<BarChart />*/}
      {/*<VoteGroup />*/}
    </div>
  );
}

export default App;
