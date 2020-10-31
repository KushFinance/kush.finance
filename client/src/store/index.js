import { createStore, combineReducers } from 'redux';

import web3 from './reducers/web3';
import routes from './reducers/routes';

const rootReducer = combineReducers({ ...web3, routes });

export default createStore(rootReducer);
