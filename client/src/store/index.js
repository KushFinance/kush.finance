import { createStore, combineReducers } from 'redux';

import web3 from './reducers/web3';

const rootReducer = combineReducers({ ...web3 });

export default createStore(rootReducer);
