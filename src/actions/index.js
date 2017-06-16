import axios from 'axios';


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
  return dispatch => twitterFetch().then(res => res.data).then((data) => {
    console.log(data);
    if (data.error !== 'User is not logged in') {
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

// ===================Submit Djin==============================
export const NEW_DJIN = 'NEW_DJIN';

const placeDjin = object => ({
  type: NEW_DJIN,
  payload: object,
});

export const submitDjin = object => (dispatch) => {
  dispatch(placeDjin(object));
  axios.post('/api/djin/submit', object).then(res => res.data).then((data) => {
    console.log(data);
  });
};
// ============================================================
// fetch User Board 

export const fetchUserBoard = id => dispatch => {
  axios.get(`/api/djin/board?id=${id}`).then(res=>res.data).then(data=>{
    console.log(data);
  })
}