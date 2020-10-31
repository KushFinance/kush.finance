import store from '../store/index.js';
import getWeb3 from '../getWeb3';

function createInstanceCreator() {
  return {
    web3: false,
    createInstance: async function (abi, address) {
      if (!this.web3) {
        this.web3 = await getWeb3();
        store.dispatch({ type: 'SET_WEB3_INSTANCE', web3: this.web3 });
      }
      const instance = new this.web3.eth.Contract(abi, address);
      return instance;
    }
  }
}

export default createInstanceCreator;
