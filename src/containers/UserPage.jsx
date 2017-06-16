import React from 'react';
import { connect } from 'react-redux';

import UserPageUnwrapped from '../components/UserPage.jsx';
import { submitDjin, fetchUserBoard } from '../actions';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  djins: state.djins.items,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  submitDjin: (object) => dispatch(submitDjin(object)),
  fetchUserBoard: (id) => dispatch(fetchUserBoard(id)),
})

const UserPage = connect(mapStateToProps, mapDispatchToProps)(UserPageUnwrapped);

export default UserPage;
