import { connect } from 'react-redux';

import App from '../components/App.jsx';
import { twitterLogin, twitterLogout } from '../actions';



const mapStateToProps = state => ({
  auth: state.auth.loggedIn,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  twitterLogin: token => dispatch(twitterLogin(token)),
  twitterLogout: () => dispatch(twitterLogout()),
});


const Root = connect(mapStateToProps, mapDispatchToProps)(App);

export default Root;
