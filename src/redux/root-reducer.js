import { combineReducers } from 'redux';
import cupReducer from './cup/cup-reducer';

export default combineReducers({
    cup: cupReducer
});