import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from '../../../../store/application/application.state';
import { MaterialActionsUnion, MaterialActionTypes } from './material.actions';
import { MaterialState } from './material.state';

export const initialMaterialState: MaterialState = {
    selectedTheme: 'music-selectedTheme',
    themes: [
        'default-theme',
        'light-theme',
        'dark-theme',
        'nature-theme',
        'music-theme',
    ],
};

export function materialReducer(state: MaterialState = initialMaterialState, action: MaterialActionsUnion): MaterialState {
    switch (action.type) {
        case MaterialActionTypes.SET_THEME:
            return {
                ...state,
                selectedTheme: action.payload,
            };
        default:
            return state;
    }
}

export const selectMaterialState = createFeatureSelector<ApplicationState, MaterialState>('material');

export const selectTheme = createSelector(selectMaterialState, (state: MaterialState) => state.selectedTheme);
export const selectThemes = createSelector(selectMaterialState, (state: MaterialState) => state.themes);
