const kseedInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KSEED_INSTANCE':
      return action.instance;
    default:
      return state;
  }
};

const kseedGovInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KSEED_GOV_INSTANCE':
      return action.instance;
    default:
      return state;
  }
};

const kushInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KUSH_INSTANCE':
      return action.instance;
    default:
      return state;
  }
};

const kushOGInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KUSH_OG_INSTANCE':
      return action.instance;
    default:
      return state;
  }
};

const kushOGUniInstance = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_KUSH_OG_UNI_INSTANCE':
      return action.instance;
    default:
      return state;
  }
};

const web3Instance = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WEB3_INSTANCE':
      return action.web3;
    default:
      return state;
  }
}

const accounts = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return action.accounts;
    default:
      return state;
  }
}

export default { kseedInstance, kseedGovInstance, kushInstance, kushOGInstance, kushOGUniInstance, web3Instance, accounts };
