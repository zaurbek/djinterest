import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import FrontPage from '../containers/FrontPage.jsx';
import TopMenu from '../containers/TopMenu.jsx';
import Page404 from './UnknownPage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.loggedIn) {
        this.props.twitterLogin();
    }
  }
  render() {
    return (
      <div><Router>
                <div>
                <Route component={TopMenu} />
            <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route component={Page404}/> 
            </Switch>
            </div>
            </Router></div>
    )
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  twitterLogin: PropTypes.func.isRequired,
}

export default App;