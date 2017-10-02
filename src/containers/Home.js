import React from 'react';
import PropTypes from 'prop-types'
import reduxConnect from '../redux/utils/connect'

class About extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  onInc = () => {
    this.props.actions.incrementValue();
  };

  onDec = () => {
    this.props.actions.decrementValue();
  };

  render () {
    const {store} = this.props;

    return (
      <div>
        <p>Home page</p>
        <a onClick={this.onInc}>Increment</a>
        <br/>
        <a onClick={this.onDec}>Decrement</a>
        <p>Value = {store.firstModule.value}</p>
      </div>
    )
  }
}

export default reduxConnect()(About)