import React from 'react';
import { Provider } from 'react-redux';
import redaxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux';

import reducers from 'reducers';

export default ({ children, initialState = {} }) => {
  const store = createStore(reducers, initialState, applyMiddleware(redaxPromise));

  return (<Provider store={store}>{children}</Provider>);
}
