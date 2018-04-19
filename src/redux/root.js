import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux'

import firstModule from './modules/firstModule'
import auth from './modules/auth'

export const rootReducers = combineReducers({
  routing: routerReducer,
  firstModule: firstModule.reducers,
  auth: auth.reducers
});

export const rootActions = Object.assign(
  {},
  {
    auth: auth.actions
  },
  firstModule.actions
);