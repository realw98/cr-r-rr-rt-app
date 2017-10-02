import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux'

import firstModule from './modules/firstModule'

export const rootReducers = combineReducers({
  routing: routerReducer,
  firstModule: firstModule.reducers
});

export const rootActions = Object.assign(
  {},
  firstModule.actions
);