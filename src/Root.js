import React from 'react';
import { Provider } from 'react-redux';
import myAsyncMiddleware from 'middlewares/async';
import myStateValidatorMiddleware from 'middlewares/stateValidator';
import { createStore, applyMiddleware } from 'redux';

import reducers from 'reducers';

export default ({ children, initialState = {} }) => {
  const store = createStore(reducers, initialState, applyMiddleware(myAsyncMiddleware, myStateValidatorMiddleware));

  return (<Provider store={store}>{children}</Provider>);
}
