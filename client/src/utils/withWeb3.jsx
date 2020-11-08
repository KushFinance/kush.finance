import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createInstanceCreator from './instanceCreator';

// ABIS
import kSeedToken from "../contracts/kSeedToken.json";
import kSeedGovToken from "../contracts/kSEEDGovernance.json";
import KushToken from "../contracts/kKushToken.json";
import KushOGToken from "../contracts/kushOGToken.json";
import KushOGUniToken from "../contracts/kushOGtokenUni.json";

const {
  REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KUSHOG_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KSEEDGOV_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_KUSHOG_UNI_TOKEN_CONTRACT_ADDRESS
} = process.env;

function withWeb3(Component) {
  return function(props) {
    const creator = createInstanceCreator();

    const kseedInstance = useSelector(state => state.kseedInstance);
    const kseedGovInstance = useSelector(state => state.kseedGovInstance);
    const kushInstance = useSelector(state => state.kushInstance);
    const kushOGInstance = useSelector(state => state.kushOGInstance);
    const kushOGUniInstance = useSelector(state => state.kushOGUniInstance);

    const dispatch = useDispatch();

    async function createkSeedInstance() {
      const instance = await creator.createInstance(kSeedToken.abi, REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS);
      dispatch({ type: 'CREATE_KSEED_INSTANCE', instance });
    }

    async function createkSeedGovInstance() {
      const instance = await creator.createInstance(kSeedGovToken.abi, REACT_APP_KSEEDGOV_TOKEN_CONTRACT_ADDRESS);
      dispatch({ type: 'CREATE_KSEED_GOV_INSTANCE', instance });
    }

    async function createkKushInstance() {
      const instance = await creator.createInstance(KushToken.abi, REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS);
      dispatch({ type: 'CREATE_KUSH_INSTANCE', instance });
    }

    async function createkKushOGInstance() {
      const instance = await creator.createInstance(KushOGToken.abi, REACT_APP_KUSHOG_TOKEN_CONTRACT_ADDRESS);
      dispatch({ type: 'CREATE_KUSH_OG_INSTANCE', instance });
    }

    async function createkKushOGUniInstance() {
      const instance = await creator.createInstance(KushOGUniToken, REACT_APP_KUSHOG_UNI_TOKEN_CONTRACT_ADDRESS);
      dispatch({ type: 'CREATE_KUSH_OG_UNI_INSTANCE', instance });
    }

    useEffect(() => {
      if (!kseedInstance.methods) {
        createkSeedInstance();
      }

      if (!kseedGovInstance.methods) {
        createkSeedGovInstance();
      }

      if (!kushInstance.methods) {
        createkKushInstance();
      }

      if (!kushOGInstance.methods) {
        createkKushOGInstance();
      }
      if (!kushOGUniInstance.methods) {
        createkKushOGUniInstance();
      }
    }, []); // eslint-disable-line

    return (
      <Component {...props} />
    );
  }
}

export default withWeb3;
