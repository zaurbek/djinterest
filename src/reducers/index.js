import { combineReducers } from 'redux';
import auth from './authReducer';
import djins from './djinReducer';


export default combineReducers({
    auth,
    djins,
});