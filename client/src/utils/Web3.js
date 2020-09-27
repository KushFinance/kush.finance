/* Web3.js */
/* Web3 helper functions */
//import Web3 from "web3";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import React, { useContext, useState, useEffect} from "react";
//window.ethereum



  /*
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "83301e4b4e234662b7769295c0f4a2e1" // required
      }
    }
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required,
    theme: {
      background: "rgb(253, 250, 250)",
      main: "rgb(33, 37, 41)",
      secondary: "rgb(136, 136, 136)",
      border: "rgba(195, 195, 195, 0.14)",
      hover: "rgb(252,163,220)"
    }
  });

  if(!web3Modal) {
    return false
  }

  

  const web3 = new Web3(provider);
  
  /*window.web3Modal = web3Modal;
  window.web3Instance = web3;
  window.web3Provider = provider;*/
  
  //dispatch({ type: 'setWeb3Connected' })

  //return ('<div/>')

  /*
  if(window.web3Instance) return window.web3Instance;
  
  
  
  

  if(!web3Modal) {
    return false
  }

  let provider = false;
  try {
    provider = await web3Modal.connect();
  } catch (exception){
    console.log('exception thrown while instantiating web3modal');
    console.log(exception)
    return false
  }
  
  // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info: { chainId: number }) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
    });

  const web3 = new Web3(provider);
  window.web3Modal = web3Modal;
  window.web3Instance = web3;
  window.web3Provider = provider;
  
  return web3;
  
  /*
    if (window.ethereum) {
      console.log('window.ethereum')
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          console.log('enabled?')
          window.web3Instance = web3;
          // Acccounts now exposed
          return web3;
        } catch (error) {
          console.log('an error occurred')
          return null;
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log('else if window web3')
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        return web3;
      }
      // Fallback to localhost; use dev console port by default...
      else {
        /*
        console.log('fallback to localhost')
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        return web3;
        
        return false;
      }
      
 }
 */

 /**
  * Check to see if there's a web3 instance to use
  */
 /*
 async function checkWeb3IsPresent(){
   let instance = await GetInstance();
   if(!instance) return false;
   return true;
}
*/

 /** Get all accounts */
 /*
 async function getAccounts(){
    const instance = await GetInstance();
    return instance.eth.getAccounts();
    //return {};
 }
 

 async function getNetworkId(){
    const instance = await GetInstance();
    return instance.eth.net.getId()
 }
 */

 // Export each function
 export {
    //checkWeb3IsPresent,
    //getAccounts,
    //getNetworkId
 };