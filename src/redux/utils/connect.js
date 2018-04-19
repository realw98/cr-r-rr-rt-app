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

    const mapStateToProps = state => {

      if (!stateMappings) {
        return {store: state.toJS()};

      } else {
        let result = {};
        for (let propName in stateMappings) {
          result[propName] = state.getIn(stateMappings[propName]).toJS();
        }
        return result;

      }

    };

    const mapDispatchToProps = dispatch => ({
      actions: bindActionCreatorsRecursive(rootActions, dispatch)
    });

    return connect(mapStateToProps, mapDispatchToProps)(component)
  }

}

