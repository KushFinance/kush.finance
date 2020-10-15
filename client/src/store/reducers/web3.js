import getWeb3 from "../../getWeb3";
import kSeedToken from "../../contracts/kSeedToken.json";
import kSeedGovToken from "../../contracts/kSEEDGovernance.json";
import KushToken from "../../contracts/kKushToken.json";
import KushOGToken from "../../contracts/kushOGToken.json";

let web3 = false;

const createInstance = async (abi, address) => {
  if (!web3) {
    web3 = await getWeb3();
  }
  const instance = new web3.eth.Contract(abi, address);
  return instance;
}

const kseedInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KSEED_INSTANCE':
      return createInstance(kSeedToken.abi, process.env.REACT_APP_KSEED_TOKEN_CONTRACT_ADDRESS);
    default:
      return state;
  }
};

const kseedGovInstance = async (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KSEED_GOV_INSTANCE':
      const instance = await createInstance(kSeedGovToken.abi, process.env.REACT_APP_KSEEDGOV_TOKEN_CONTRACT_ADDRESS);
      return instance;
    default:
      return state;
  }
};

const kushInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KUSH_INSTANCE':
      return createInstance(KushToken.abi, process.env.REACT_APP_KUSH_TOKEN_CONTRACT_ADDRESS);
    default:
      return state;
  }
};

const kushOGInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KUSHOG_INSTANCE':
      return createInstance(KushOGToken.abi, process.env.REACT_APP_KUSHOG_TOKEN_CONTRACT_ADDRESS);
    default:
      return state;
  }
};

const web3Instance = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WEB3_INSTANCE':
      return action.web3;
    default:
      return web3;
  }
}

export default { kseedInstance, kseedGovInstance, kushInstance, kushOGInstance, web3Instance };

