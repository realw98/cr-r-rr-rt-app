import React from 'react';
import PropTypes from 'prop-types'
import reduxConnect from './redux/utils/connect'
import './App.css';
import Home from './containers/Home'
import About from './containers/About'
import {Redirect, Route, Switch} from 'react-router-dom';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.object
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Redirect from="/" to="home" />
            <Redirect from="*" to="home" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default reduxConnect()(App);
