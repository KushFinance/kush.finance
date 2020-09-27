/* Web3.js */
/* Web3 helper functions */
//import Web3 from "web3";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import React, { useContext, useState, useEffect} from "react";
//window.ethereum

import { useGlobal } from "reactn";
import { withRouter, Redirect } from 'react-router-dom';

const Web3Wrapper = (props) => {

    const [ requestConnectionToWallet, setRequestConnectionToWallet ] = useGlobal('requestConnectionToWallet');
    const [ web3Instance, setWeb3Instance ] = useGlobal('web3Instance');
    
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "ba0fa4b3210c4528bf4aaefc58eb1251" // required
        }
      }
    };
  
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions, // required,
      theme: {
        background: "rgb(253, 250, 250)",
        main: "rgb(33, 37, 41)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(252,163,220)"
      }
    });

    useEffect(() => {
      // only fires whenever requestConnectionToWallet is updated.
      async function connectProvider() {
        
        let provider = false;
        try {
          console.log('trying to connect');
          provider = await web3Modal.connect();
        } catch (exception){
          console.log('exception thrown while instantiating web3modal');
          console.log(exception)
          return false
        }

        console.log('setting the provider')
        console.log(provider);

        const web3 = new Web3(provider);
        setWeb3Instance(web3)
      }

      if(requestConnectionToWallet){
        connectProvider()
      }

    }, [requestConnectionToWallet])
      
    return (
      <div>
        {web3Instance ? <Redirect to="/app"/> : null }
        {props.children}
      </div>
    )
}

export default Web3Wrapper;