import { cupActionTypes } from './cup-types';

const INITIAL_STATE = {
    cupText: []
}

const cupReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case cupActionTypes.SET_NEW_TEXT:
            return {
                ...state,
                cupText: action.payload
            };
        default:
            return state;
    }
}

export default cupReducer;