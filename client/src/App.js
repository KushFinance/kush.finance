import React, { Component } from "react";
import { BrowserRouter,  Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Transition from './utils/switchTransitionConfig';
import { useGlobal } from 'reactn';
import GovernPage from "./views/GovernPage";
import FarmingPage from "./views/FarmingPage";
import SeedingPage from "./views/SeedingPage";
import WalletPage from "./views/WalletPage";
import SettingsPage from "./views/SettingsPage";
import KushARTPage from "./views/KushARTPage";
import Web3Connection from "./components/Web3Connection.jsx";
import Menu from "./components/Menu";
import Drawer from "./components/Drawer";
import Footer from "./components/Footer";
import KushShowcase from "./components/KushShowcase";
import FloatWallet from "./components/FloatWallet";
import "./style/index.sass";
import withWeb3 from "./utils/withWeb3";

class App extends Component {
  
  render() {
    if(!localStorage.getItem("kseedBalance")){
      localStorage.setItem("kseedBalance","true");
      localStorage.setItem("kseedSupply","true");
      localStorage.setItem("kseedTotal","true");
      localStorage.setItem("kkushSupply","true");
      localStorage.setItem("kushOGSupply","true");
      localStorage.setItem("darkMode","false");
    }
    return (

      <BrowserRouter>
        <div className="bg-lime"></div>
        <div className={`App ${localStorage.getItem('darkMode') === "true" && 'dark-mode'}`}>
          <Drawer/>
          <div className="sidebar">
            <Menu />
            <FloatWallet />
            <Footer />
          </div>
          <div className="content">
              <AnimatedSwitch
                atEnter={Transition.bounceTransition.atEnter}
                atLeave={Transition.bounceTransition.atLeave}
                atActive={Transition.bounceTransition.atActive}
                mapStyles={Transition.mapStyles}
                className="route-wrapper"
              >
                 <Web3Connection>
                <Route exact path="/">
                  <KushShowcase />
                </Route>
                <Route path="/seeding">
                  <SeedingPage />
                </Route>
                <Route path="/wallet" >
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
        </div>
      </BrowserRouter>
    );
  }
}

export default withWeb3(App);
 