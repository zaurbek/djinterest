import React from 'react';
import { connect } from 'react-redux';

import FrontPage from '../components/FrontPage.jsx';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const FrontPageWrapped = connect(mapStateToProps, null)(FrontPage);


export default FrontPageWrapped;
