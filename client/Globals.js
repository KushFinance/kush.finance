import { setGlobal } from 'reactn';

//https://medium.com/@Charles_Stover/manage-global-state-with-react-hooks-6065041b55b4
setGlobal({
  web3Instance: false,
  walletIsConnected: false,
  requestConnectionToWallet: false
});
