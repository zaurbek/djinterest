import { connect } from 'react-redux';

import App from '../components/App.jsx';
import { twitterLogin, twitterLogout } from '../actions';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  twitterLogin: () => dispatch(twitterLogin()),
  twitterLogout: () => dispatch(twitterLogout()),
});

const Root = connect(mapStateToProps, mapDispatchToProps)(App);

export default Root;
