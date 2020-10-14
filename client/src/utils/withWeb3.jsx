import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function withWeb3(Component) {
  return function(props) {
    const kseedInstance = useSelector(state => state.kseedInstance);

    const dispatch = useDispatch();

    useEffect(() => {
      if (!kseedInstance.methods) {
        dispatch({ type: 'CREATE_KSEED_INSTANCE' });
        dispatch({ type: 'CREATE_KSEED_GOV_INSTANCE' });
        dispatch({ type: 'CREATE_KUSH_INSTANCE' });
        dispatch({ type: 'CREATE_KUSHOG_INSTANCE' });
      }
    }, []); // eslint-disable-line

    return (
      <Component {...props} />
    );
  }
}

export default withWeb3;
