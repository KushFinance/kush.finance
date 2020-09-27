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
import Web3Connection from "./components/Web3Connection.jsx";
import Menu from "./components/Menu";
import Drawer from "./components/Drawer";
import Footer from "./components/Footer";
import KushShowcase from "./components/KushShowcase";
import FloatWallet from "./components/FloatWallet";
import "./style/index.sass";
const [ web3Instance ] = useGlobal('web3Instance');
//import WalletConnect from "@walletconnect/client";
//import QRCodeModal from "@walletconnect/qrcode-modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// // Create a connector
// const connector = new WalletConnect({
//   bridge: "https://bridge.walletconnect.org", // Required
//   qrcodeModal: QRCodeModal,
// });

// // Check if connection is already established
// if (!connector.connected) {
//   // create new session
//   connector.createSession();
// }

// // Subscribe to connection events
// connector.on("connect", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Get provided accounts and chainId
//   const { accounts, chainId } = payload.params[0];
// });

// connector.on("session_update", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Get updated accounts and chainId
//   const { accounts, chainId } = payload.params[0];
// });

// connector.on("disconnect", (error, payload) => {
//   if (error) {
//     throw error;
//   }

//   // Delete connector
// });
class App extends Component {
  
  render() {document.title = "kush.finance";
    if(!localStorage.getItem("kseedBalance")){
      localStorage.setItem("kseedBalance","true");
      localStorage.setItem("kseedSupply","true");
      localStorage.setItem("kseedTotal","true");
      localStorage.setItem("kkushSupply","true");
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

export default App;
