import { cupActionTypes } from './cup-types';

const INITIAL_STATE = {
	cupText: [
		{
			id: 1,
			label: 'Treść nr',
			value: '',
			error: null,
			fontSize: 24,
			color: '#000',
			fontFamily: '',
			variants: null,
			fontWeight: null,
			fontStyle: 'normal',
			transform: null,
			fontFamilySearchQuery: '',
		},
	],
	currentTextFieldsOptions: 0,
	cupImage: [{ key: 0, imgPreviewUrl: null, name: '', width: null, height: null, transform: null }],
	previewImage: null,
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
		case cupActionTypes.SAVE_PREVIEW_IMAGE:
			return {
				...state,
				previewImage: action.payload,
			};
		case cupActionTypes.ADD_POSITION_DATA:
			const positionDataText = action.payload.text;
			const positionDataImage = action.payload.image;
			return {
				...state,
				cupText: state.cupText.map(v => {
					v.transform = positionDataText[v.id - 1].transform;
					return v;
				}),
				cupImage: positionDataImage.length > 0 ? state.cupImage.map(v => {
					if(v.name !== '') {
						v.width = positionDataImage[v.key].width;
						v.height = positionDataImage[v.key].height;
						v.transform = positionDataImage[v.key].transform;
					}
					return v;
				}) : state.cupImage,
			};
		case cupActionTypes.CHANGE_TEXT_FIELD_OPTIONS:
			return {
				...state,
				currentTextFieldsOptions: action.payload,
			};
		case cupActionTypes.FONT_FAMILY_SEARCH:
			const index = action.payload.index;
			const value = action.payload.value;
			return {
				...state,
				cupText: state.cupText.map(v => {
					if(v.id === index + 1) {
						v.fontFamilySearchQuery = value;
					}
					return v;
				}),
			};
		default:
			return state;
	}
};

export default cupReducer;
