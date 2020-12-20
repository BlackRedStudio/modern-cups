import cupActionTypes from './cup-actions';

const INITIAL_STATE = {
    content: ''
}

const cupReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case cupActionTypes.SET_NEW_CUP:
            return {
                ...state,
                currentCup: action.payload
            };
        default:
            return state;
    }
}

export default cupReducer;