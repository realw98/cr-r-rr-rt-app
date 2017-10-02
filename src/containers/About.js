import React from 'react';
import PropTypes from 'prop-types'
import reduxConnect from '../redux/utils/connect'

class About extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render () {
    return (
      <p>About page</p>
    )
  }
}

export default reduxConnect()(About)