import ReduxModule from './abstract/reduxModule'

const INCREMENT_VALUE = 'increment value';
const DECREMENT_VALUE = 'decrement value';

class FirstModule extends ReduxModule {
  getNamespace() {
    return '[first module]';
  }

  defineActions () {
    const incrementValue = this.createAction(INCREMENT_VALUE);
    const decrementValue = this.createAction(DECREMENT_VALUE);
    return {
      incrementValue,
      decrementValue
    }
  }

  getInitialState () {
    return {
      value: 1
    }
  }

  defineReducers () {
    return {
      [INCREMENT_VALUE]: state => state.set('value', state.get('value') + 1),
      [DECREMENT_VALUE]: state => state.set('value', state.get('value') - 1)
    }
  }
}

const instance = new FirstModule();
instance.init();
export default instance;