import { combineReducers } from 'redux';
import initialStore from '../store/initialStore';

export default (state = initialStore, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


