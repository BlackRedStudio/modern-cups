import { cupActionTypes } from './cup-types';

export const addTextToCup = text => ({
    type: cupActionTypes.SET_NEW_TEXT,
    payload: text
})

export const addImageToCup = image => ({
    type: cupActionTypes.SET_NEW_IMAGE,
    payload: image
})

export const addImageToCupRow = imageRow => ({
    type: cupActionTypes.SET_NEW_IMAGE_ROW,
    payload: imageRow
})

export const deleteImageFromCup = () => ({
    type: cupActionTypes.DELETE_IMAGE
})

export const resetImages = () => ({
    type: cupActionTypes.RESET_IMAGES
})

export const savePreviewImage = canvas => ({
    type: cupActionTypes.SAVE_PREVIEW_IMAGE,
    payload: canvas
})
export const addPositionData = positionData => ({
    type: cupActionTypes.ADD_POSITION_DATA,
    payload: positionData
})