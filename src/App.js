import React from "react";
import {Route, Switch} from 'react-router-dom';

import "./App.css";
import VotePage from "./components/VotePage";
import ChartPage from "./components/chart/ChartPage";
import HomePage from "./components/HomePage";
import PageNotFound from "./components/PageNotFound";
import NavHeader from "./components/NavHeader";

function App() {
  return (
    <div className="App">
      <NavHeader/>
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
