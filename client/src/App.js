import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Transition from "./utils/switchTransitionConfig";
import { useGlobal } from "reactn";
import GovernPage from "./views/GovernPage";
import FarmingPage from "./views/FarmingPage";
import SeedingPage from "./views/SeedingPage";
import WalletPage from "./views/WalletPage";
import SettingsPage from "./views/SettingsPage";
import KushARTPage from "./views/KushARTPage";
import Web3Connection from "./components/Web3Connection.jsx";
import Header from "./components/Header";
import Menu from "./components/Menu";
import KushShowcase from "./components/KushShowcase";
import Wallet from "./components/Wallet";
import Footer from "./components/Footer";
import "./style/index.sass";
import withWeb3 from "./utils/withWeb3";

class App extends Component {
  render() {
    if (!localStorage.getItem("kseedBalance")) {
      localStorage.setItem("kseedBalance", "true");
      localStorage.setItem("kseedSupply", "true");
      localStorage.setItem("kseedTotal", "true");
      localStorage.setItem("kkushSupply", "true");
      localStorage.setItem("kushOGSupply", "true");
    }
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
                  <Route path="/kseed">
                    <KushShowcase />
                  </Route>
                  <Route path="/seeding">
                    <SeedingPage />
                  </Route>
                  <Route path="/wallet">
                    <WalletPage />
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
                  <Route path="/settings">
                    <SettingsPage />
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
}

export default withWeb3(App);
