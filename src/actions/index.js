import axios from 'axios';
import Cookies from 'js-cookie';


// ===================Login=============================

function twitterFetch() {
  return axios.get('/api/user_data');
}

export const USER_DATA = 'USER_DATA';

function twitterPlace(userData) {
  return {
    type: USER_DATA,
    payload: userData,
  };
}


export function twitterLogin() {
  return dispatch => twitterFetch().then(res => res.data).then(data => {
    console.log(data);
    if (data.error!=='User is not logged in') {
      return dispatch(twitterPlace(data));
    }
    
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