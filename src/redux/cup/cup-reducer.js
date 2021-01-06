import { cupActionTypes } from './cup-types';

const INITIAL_STATE = {
	cupText: [],
	cupImage: [{ key: 0, imgPreviewUrl: null, name: '' }],
};

const cupReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case cupActionTypes.SET_NEW_TEXT:
			return {
				...state,
				cupText: action.payload,
			};
		case cupActionTypes.SET_NEW_IMAGE:
			return {
				...state,
				cupImage: state.cupImage.map(cupImage =>
					cupImage.key === action.payload.key ? action.payload : cupImage
				),
			};
		case cupActionTypes.SET_NEW_IMAGE_ROW:
			return {
				...state,
				cupImage: state.cupImage.concat(action.payload),
			};
		case cupActionTypes.DELETE_IMAGE:
			return {
				...state,
				cupImage: state.cupImage.slice(0, -1),
			};
		case cupActionTypes.RESET_IMAGES:
			return {
				...state,
				cupImage: INITIAL_STATE.cupImage,
			};
		default:
			return state;
	}
};

export default cupReducer;
