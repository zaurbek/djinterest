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
    if (data.error !== 'User is not logged in') {
      return dispatch(twitterPlace(data));
    }
  });
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
    
    dispatch(placeItems(data));
  });
};
// ============================================================
// fetch User Board 

export const fetchUserBoard = id => dispatch => {
  axios.get(`/api/djin/board?id=${id}`).then(res=>res.data).then(data=>{
    
    dispatch(placeItems(data));
  })
}

// ============================================================
// fetch Whole Board

export const fetchWholeBoard = () => dispatch => {
  axios.get('/api/djin/all').then(res=>res.data).then(data=>{
    
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

const updatePinDjin = object => ({
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
    
    dispatch(updatePinDjin(data));
  })
}

// ============================================================
// like Djin
export const UPDATE_DJIN_LIKE = 'UPDATE_DJIN_LIKE';

const updateLikeDjin = object => ({
  type: UPDATE_DJIN_LIKE,
  payload: object,
});

export const TRY_LIKE_UPDATE = 'TRY_LIKE_UPDATE';

const tryLikeUpdateDjin = (person, id) => ({
  type: TRY_LIKE_UPDATE,
  payload: {
    person, 
    id
  } 
})

export const likeDjin = (person, id) => dispatch => {
  dispatch(tryLikeUpdateDjin(person, id));
  axios.post('/api/djin/like', { person, id }).then(res => res.data).then(data=>{
    dispatch(updateLikeDjin(data));
  })
}
