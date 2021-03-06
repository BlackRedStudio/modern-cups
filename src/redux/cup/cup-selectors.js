import { createSelector } from 'reselect';

const selectCup = state => state.cup;

export const selectCupText = createSelector(
    [selectCup],
    cup => cup.cupText
)

export const selectCupImage = createSelector(
    [selectCup],
    cup => cup.cupImage
)