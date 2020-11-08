import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Transition from "./utils/switchTransitionConfig";
import GovernPage from "./views/GovernPage";
import FarmingPage from "./views/FarmingPage";
import SeedingPage from "./views/SeedingPage";
import KushARTPage from "./views/KushARTPage";
import Web3Connection from "./components/Web3Connection.jsx";
import Header from "./components/Header";
import Menu from "./components/Menu";
import About from "./views/AboutPage";
import Wallet from "./components/Wallet";
import Footer from "./components/Footer";
import "./style/index.sass";
import withWeb3 from "./utils/withWeb3";

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
        <Header />
        <div className="content">
          <div className="pages">
            <AnimatedSwitch
              atEnter={Transition.bounceTransition.atEnter}
              atLeave={Transition.bounceTransition.atLeave}
              atActive={Transition.bounceTransition.atActive}
              mapStyles={Transition.mapStyles}
              className="route-wrapper"
              >
              <Web3Connection>
                <Route exact path="/">
                  <Menu />
                </Route>
                <Route path="/seeding">
                  <SeedingPage />
                </Route>
                <Route path="/wallet">
                  <Wallet show />
                </Route>
                <Route path="/farming">
                  <FarmingPage />
                </Route>
                <Route path="/kush-art">
                  <KushARTPage />
                </Route>
                <Route path="/govern">
                  <GovernPage />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
              </Web3Connection>
            </AnimatedSwitch>
          </div>
          <Wallet />
        </div>
        <Footer />
    </div>
    </BrowserRouter>
  );
}

export default withWeb3(App);
