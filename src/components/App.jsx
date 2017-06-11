import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>Hellooooo</div>
    )
  }
}

App.propTypes = {
  auth: PropTypes.bool,
}

export default App;