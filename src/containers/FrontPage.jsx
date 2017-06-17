import React from 'react';
import { connect } from 'react-redux';

import FrontPage from '../components/FrontPage.jsx';
import { fetchWholeBoard, deleteDjin, pinDjin, likeDjin } from '../actions';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
  djins: state.djins.items,
});

const mapDispatchToProps = dispatch => ({
  fetchWholeBoard: () => dispatch(fetchWholeBoard()),
  deleteDjin: id => dispatch(deleteDjin(id)),
  likeDjin: (person, id) => dispatch(likeDjin(person, id)),
  pinDjin: (person, id) => dispatch(pinDjin(person, id)),
});
const FrontPageWrapped = connect(mapStateToProps, mapDispatchToProps)(
  FrontPage,
);

export default FrontPageWrapped;
