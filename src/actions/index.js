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

export const BOARD_ITEMS = 'BOARD_ITEMS';

const placeItems = arrayOfBoard => ({
  type: BOARD_ITEMS,
  payload: arrayOfBoard,
})

export const submitDjin = object => (dispatch) => {
  dispatch(placeDjin(object));
  axios.post('/api/djin/submit', object).then(res => res.data).then((data) => {
    console.log(data);
    dispatch(placeItems(data));
  });
};
// ============================================================
// fetch User Board 

export const fetchUserBoard = id => dispatch => {
  axios.get(`/api/djin/board?id=${id}`).then(res=>res.data).then(data=>{
    console.log(data);
    dispatch(placeItems(data));
  })
}

// ============================================================
// fetch Whole Board

export const fetchWholeBoard = () => dispatch => {
  axios.get('/api/djin/all').then(res=>res.data).then(data=>{
    console.log(data);
    dispatch(placeItems(data));
  })
}


// ============================================================
// delete Djin
export const TRY_DELETE = 'TRY_DELETE';

const tryDelete = id => ({
  type: TRY_DELETE,
  payload: id,
});


export const deleteDjin = (id) => dispatch => {
  dispatch(tryDelete(id));
  axios.post('/api/djin/delete',{id})
}

// ============================================================
// pin Djin
export const UPDATE_DJIN_PIN = 'UPDATE_DJIN_PIN';

const updateDjin = object => ({
  type: UPDATE_DJIN_PIN,
  payload: object,
});

export const TRY_PIN_UPDATE = 'TRY_PIN_UPDATE';

const tryPinUpdateDjin = (person, id) => ({
  type: TRY_PIN_UPDATE,
  payload: {
    person, 
    id
  } 
})

export const pinDjin = (person, id) => dispatch => {
  dispatch(tryPinUpdateDjin(person, id));
  axios.post('/api/djin/pin', { person, id }).then(res => res.data).then(data=>{
    console.log(data);
    dispatch(updateDjin(data));
  })
}