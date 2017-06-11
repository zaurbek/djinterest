import axios from 'axios';
import Cookies from 'js-cookie';


// ===================Login=============================

function twitterFetch(token) {
  return axios.get(`https://api.twitter.com/user?access_token=${token}`);
}

export const USER_DATA = 'USER_DATA';

function twitterPlace(userData) {
  return {
    type: USER_DATA,
    payload: userData,
  };
}


export function twitterLogin(token) {
  return dispatch => twitterFetch(token).then(res => res.data).then((data) => {
    console.log(data);
    return dispatch(twitterPlace(data));
  });
}

// ===================Logout==============================
export const USER_LOGOUT = 'USER_LOGOUT';

export function twitterLogout(history) {
  Cookies.remove('token');
  history.push('/');
  return {
    type: USER_LOGOUT,
  };
}