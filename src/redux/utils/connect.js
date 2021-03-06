import { connect } from 'react-redux'
import { rootActions } from '../root'

//This is recursive version of standard redux bindActionCreators
function bindActionCreatorsRecursive (actions, dispatch) {
  if (typeof dispatch !== 'function') {
    throw new TypeError('Action wrapper needs a dispatch function');
  }
  return Object.keys(actions).reduce(function (acc, key) {
    if (typeof actions[key] === 'function') {
      acc[key] = function () {
        return dispatch(actions[key].apply(null, arguments));
      };
    } else if (actions[key] !== null && typeof actions[key] === 'object') {
      acc[key] = bindActionCreatorsRecursive(actions[key], dispatch);
    }

    return acc;
  }, {});
}

export default function reduxConnect (stateMappings) {

  return component => {

    const mapStateToProps = stateMappings ?
      (state) => {
        let result = {};
        for (let propName in stateMappings) {
          const prop = state.getIn(stateMappings[propName]);
          result[propName] = (typeof prop.toJS === 'function') ? prop.toJS() : prop;
        }
        return result;
      } :

      (state) => ({store: state.toJS()});

    const mapDispatchToProps = dispatch => ({
      actions: bindActionCreatorsRecursive(rootActions, dispatch)
    });

    return connect(mapStateToProps, mapDispatchToProps)(component)
  }

}

