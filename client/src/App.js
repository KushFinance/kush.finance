import React, { Component } from "react";
import Staking from "./Staking";
import Pump from "./Pump";
import Mine from "./Mine";
import kSeedToken from "./contracts/kSeedToken.json";
import KushToken from "./contracts/kKushToken.json";
import getWeb3 from "./getWeb3";
import {setWeb3} from "./shared";
import "./App.css";
import { Statistic, Button, Card } from 'antd';



import kushLogo from './assets/logo.png';

import Web3 from "web3";

//import WalletConnect from "@walletconnect/client";
//import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

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
const { Meta } = Card;
class App extends Component {
  state = {
    isViewingStaking : false,
    isViewingPump: false,
    kseedBalance: 0,
    totalkSeedSupply: 0,
    totalkSeedStaked: 0,
    totalKushSupply: 0,
    isViewingGifts: false,
    isViewingMine: false
   };

   mediaQuery = {
    desktop: 1200,
    tablet: 768,
    phone: 576,
  };

  toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  }

  getRoundedkSeedBalance() {
    return this.toFixed(this.state.kseedBalance, 6);
  }

  getRoundedTotalkSeedStaked() {
    let _kseedStaked = this.state.totalkSeedStaked;
    if (!isNaN(_kseedStaked)) {
      return parseFloat(_kseedStaked).toFixed(2);
    }
    
    return _kseedStaked;
  }

   getkSeedBalance = async () => {
     let _kseedBalance = await this.kseedInstance.methods.balanceOf(this.accounts[0]).call();
     this.setState({
       kseedBalance: this.web3.utils.fromWei(_kseedBalance)
     })
   }

   getkSeedSupply = async () => {
    let _kseedSupply = await this.kseedInstance.methods.totalSupply().call();
    this.setState({
      totalkSeedSupply: this.web3.utils.fromWei(_kseedSupply)
    })
  }

  totalkSeedStaked = async () => {
   let _totalkSeedStaked = await this.kushInstance.methods.totalStakedSupply().call();

   this.setState({
     totalkSeedStaked: this.web3.utils.fromWei(_totalkSeedStaked)
   })
 }

 getKushSupply = async () => {
  let _kushSupply = await this.kushInstance.methods.totalSupply().call();

  this.setState({
    totalKushSupply: this.web3.utils.fromWei(_kushSupply)
  })
}

   setkSeedAddress = async () => {
     await this.kushInstance.methods.setkSeedAddress(this.kseedInstance._address).send({
      from: this.accounts[0],
      gas: 1000000
     });
   }

   toggleStakingView = () => {
    this.setState({
      isViewingStaking: !this.state.isViewingStaking
    });
  };


  togglePumpView = () => {
    this.setState({
      isViewingPump: !this.state.isViewingPump
    })
  }

  toggleMineView = () => {
    this.setState({
      isViewingMine: !this.state.isViewingMine
    })
  }

  _getWeb3 = () => {
    return this.web3;
  }


  componentDidMount = async () => {
    document.title = "Kush.Finance";

    try {
      // // Get network provider and web3 instance.
      if (!window.ethereum) {
          //  Create WalletConnect Provider
        const provider = new WalletConnectProvider({
          infuraId: "ba0fa4b3210c4528bf4aaefc58eb1251" // Required
        });

        //  Enable session (triggers QR Code modal)
        await provider.enable();

        //  Create Web3
        this.web3 = new Web3(provider);
      } else {
        this.web3 = await getWeb3();
      }

      
      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();
      
      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
     
      this.kseedInstance = new this.web3.eth.Contract(
        kSeedToken.abi,
        process.env.REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS
      );
     
      this.kushInstance = new this.web3.eth.Contract(
        KushToken.abi,
        process.env.REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS
      );

      setWeb3(this.web3);

      this.getkSeedSupply();
      this.getKushSupply();
      this.totalkSeedStaked();
    
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded: true}, this.getkSeedBalance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  render() {
    // if (!this.state.loaded) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className="App">
        <div className="Logo">KUSH.FINANCE</div>
        <div className="top-box-container">
          <div className="top-box balance-box">
            <img className="balance-logo-image" alt="balance logo" src={kushLogo}/>
            <Statistic title="Your k.SEED Balance" value={this.getRoundedkSeedBalance()} precision={2} />
            <div className="top-box-val nyan-balance"></div>
          </div>
          <div className="top-box stats-box">
            <div className="stats-op">
            <Statistic title="Total k.SEED Supply" value={this.state.totalkSeedSupply} precision={2} />
            </div>
            <div className="stats-op">
            <Statistic title="Total k.SEED Seeded" value={this.getRoundedTotalkSeedStaked()} precision={2} />
            </div>
            <div className="stats-op">
            <Statistic title="Total k.KUSH Supply" value={this.state.totalKushSupply} precision={2} />

            </div>
          </div>
        </div>
        <div className="Options-box">
          <div className="Option stake" onClick={this.toggleStakingView}>
          <h3>SEEDING</h3>
          </div>
          <div className="Option mine" onClick={this.toggleMineView}>
          <h3>FARMING</h3>
          </div>
          <div className="Option pumped" onClick={this.togglePumpView}>
          <h3>GOVERN</h3>
          </div>
        </div>

        <div className="Options-box">
        <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="Trade or Add Liqudity on $kSEED" extra={<a href="https://uniswap.info/token/0x3f09400313e83d53366147e3ea0e4e2279d80850">More</a>} src="https://www.pngfind.com/pngs/m/67-672523_milwaukie-cannabis-seeds-3-seed-cannabis-seeds-png.png" />}
  >
    <Meta  extra={<a href="https://uniswap.info/token/0x3f09400313e83d53366147e3ea0e4e2279d80850">More</a>} title="Trade or Add Liqudity on $kSEED" />
  </Card> </div>
        {this.state.isViewingStaking ? <Staking toggle={this.toggleStakingView} /> : null}
        {this.state.isViewingPump ? <Pump toggle={this.togglePumpView} /> : null}
        {this.state.isViewingMine ? <Mine toggle={this.toggleMineView} /> : null}

        <div className="address ny"><div className="addr-name">kSEED address:</div> <a href="https://etherscan.io/address/0x3f09400313e83d53366147e3ea0e4e2279d80850" className="addr-pink">0x3f09400313e83d53366147e3ea0e4e2279d80850</a></div>
        <div className="address ct"><div className="addr-name">kKUSH address:</div> <a href="https://etherscan.io/address/0x538b4b507d57bf9ebd8847ec395b7b061c150181" className="addr-pink">0x538b4b507d57bf9ebd8847ec395b7b061c150181</a> </div>
        <div className="address ct"><div className="addr-name">kushOG address:</div> <a href="https://etherscan.io/address/0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4" className="addr-pink">0x8DdF8Af6A26D316Ac07269dd490BBFb31718A3d4</a> </div>
        <div className="links-box">
          <a href="https://etherscan.io/token/0x3f09400313e83d53366147e3ea0e4e2279d80850">k.SEED Token Etherscan</a> . <a href="https://uniswap.info/pair/0xdcff4c70131b476595b449c7db17cd92663aa513">k.SEED-ETH Uniswap</a>
        </div>
        <div className="social-box">
            <a target="_blank" rel="noopener noreferrer" href={"https://github.com/KushFinance/kush.finance"}>
              <div className="social-icon git"></div>
            </a>
            <a target="_blank" rel="noopener noreferrer" href={"https://twitter.com/KushFinance"}>
              <div className="social-icon twit"></div>
            </a> 
            <a target="_blank" rel="noopener noreferrer" href={"https://T.me/kushfinance"}>
              <div className="social-icon tele"></div>
            </a>
            <a target="_blank" rel="noopener noreferrer" href={"https://uniswap.info/pair/0xdcff4c70131b476595b449c7db17cd92663aa513"}>
            <div className="social-icon uni"></div>
            </a>
            
            <a target="_blank" rel="noopener noreferrer" href={"https://www.unicrypt.network/uniswap-browser/pair/0xDCfF4c70131B476595B449C7dB17cd92663aa513"}>
            <div className="social-icon unicrypt"></div>
            </a>
            
        </div>
        {/* <div className="gift-icon"></div>
        <div className="gift-box">
          <textarea></textarea>
        </div> */}
      </div>
    );
  }
}

export default App;
