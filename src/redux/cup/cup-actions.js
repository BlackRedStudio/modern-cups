import { cupActionTypes } from './cup-types';

export const addTextToCup = text => ({
    type: cupActionTypes.SET_NEW_TEXT,
    payload: text
})