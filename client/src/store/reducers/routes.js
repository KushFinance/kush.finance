const routes = (state = '/', action) => {
  switch (action.type) {
    case 'SET_ROUTE':
      return action.route;
    default:
      return state;
  }
}

export default routes;
