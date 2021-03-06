import {createAction} from 'redux-actions'

export const tokenInject = (fn) =>
  (dispatch, getState) =>
    fn(dispatch, getState, getState().getIn(['auth', 'token']));

const thunkAction = (actionName, actionMethod, emitPending = false, customPendingAction = false) => {
  const fulfilledAction = createAction(`${actionName} fulfilled`);
  const pendingAction = customPendingAction ||
    createAction(`${actionName} pending`, (isPending, success) => ({isPending, success}));

  return (...args) => {
    return (dispatch, getState, token) => {

      const fulfilled = (...fArgs) => {
        dispatch(fulfilledAction(...fArgs));
        emitPending && dispatch(pendingAction(false, true));
      };

      const onError = () => {
        emitPending && dispatch(pendingAction(false, false));
      };

      emitPending && dispatch(pendingAction(true));

      const result = actionMethod(...args, {dispatch, getState, token, fulfilled});
      if (result instanceof Promise) {
        result.catch(onError);
      }
      return result;
    };
  }
};

export default thunkAction;