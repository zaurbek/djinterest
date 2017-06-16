import React from 'react';
import { connect } from 'react-redux';

import TopMenu from '../components/TopMenu.jsx';
import { githubLogout } from '../actions';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});
const Top = connect(mapStateToProps, null)(TopMenu);

export default Top;
