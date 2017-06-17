import React from 'react';
import { connect } from 'react-redux';

import UserPageUnwrapped from '../components/UserPage.jsx';
import { submitDjin, fetchUserBoard, deleteDjin, pinDjin, likeDjin } from '../actions';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  djins: state.djins.items,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  submitDjin: (object) => dispatch(submitDjin(object)),
  fetchUserBoard: (id) => dispatch(fetchUserBoard(id)),
  deleteDjin: (id)=> dispatch(deleteDjin(id)),
  likeDjin: (person, id)=> dispatch(likeDjin(person,id)),
  pinDjin: (person, id) => dispatch(pinDjin(person,id)),
})

const UserPage = connect(mapStateToProps, mapDispatchToProps)(UserPageUnwrapped);

export default UserPage;
