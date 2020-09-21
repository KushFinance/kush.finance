import React, { Component } from "react";
import { BrowserRouter,  Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Transition from '../utils/switchTransitionConfig';

import GovernPage from "./GovernPage";
import FarmingPage from "./FarmingPage";
import SeedingPage from "./SeedingPage";

import Menu from "../components/Menu";
import Footer from "../components/Footer";
import KushShowcase from "../components/KushShowcase";
import Balance from "../components/Balance";

class Homepage extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="sidebar">
            <Menu />
            <Balance />
            <Footer />
          </div>
          <div className="content">
              <AnimatedSwitch
                atEnter={Transition.bounceTransition.atEnter}
                atActive={Transition.bounceTransition.atActive}
                mapStyles={Transition.mapStyles}
                className="route-wrapper"
              >
                
                <Route exact path="/">
                  <KushShowcase />
                </Route>
                <Route path="/seeding">
                  <SeedingPage />
                </Route>
                <Route path="/farming">
                  <FarmingPage />
                </Route>
                <Route path="/govern">
                  <GovernPage />
                </Route>
              </AnimatedSwitch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Homepage;
