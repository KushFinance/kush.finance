import React from 'react';
import { Link as _Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Link(props) {
  const dispatch = useDispatch();

  const handleRedirect = () => {
    dispatch({ type: 'SET_ROUTE', route: props.to });
  };

  return (
    <_Link {...props} onClick={handleRedirect} />
  );
}
