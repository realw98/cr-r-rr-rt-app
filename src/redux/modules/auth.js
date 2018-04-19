import ReduxModule from './abstract/reduxModule'


class AuthModule extends ReduxModule {

  getNamespace () {
    return '[Auth]';
  }

  defineActions () {
    return {

    }
  }

  getInitialState () {
    return {
      token: null,
    }
  }

  defineReducers () {
    return {

    }
  }

}

const instance = new AuthModule();
instance.init();
export default instance;
