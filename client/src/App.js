import React, {Component} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./style/index.sass";

import Homepage from "./views/Homepage"
import GovernPage from "./views/GovernPage"
import ResearchPage from "./views/ResearchPage"
import SeedingPage from "./views/SeedingPage"

class App extends Component{
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" >
            <Homepage/>
          </Route>
          <Route path="/seeding">
            <SeedingPage/>
          </Route>
          <Route path="/research">
            <ResearchPage/>
          </Route>
          <Route path="/govern">
            <GovernPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
