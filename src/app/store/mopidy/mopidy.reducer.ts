import { createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { MopidyActionsUnion, MopidyActionTypes } from './mopidy.actions';
import { ApplicationState } from '../application/application.state';
import { MopidyState } from './mopidy.state';

export const initialMopidyState: MopidyState = {
    version: '',
    uriSchemes: [],
    state: 'off',
    webSocketUrl: environment.webSocketUrl,
};

export function mopidyReducer(state: MopidyState = initialMopidyState, action: MopidyActionsUnion): MopidyState {
    switch (action.type) {
        case MopidyActionTypes.STATE_CHANGED:
            return {
                ...state,
                state: action.payload,
            };
        case MopidyActionTypes.GET_VERSION_SUCCESS:
            return {
                ...state,
                version: action.payload,
            };
        case MopidyActionTypes.GET_URI_SCHEMES_SUCCESS:
            return {
                ...state,
                uriSchemes: action.payload,
            };
        default:
            return state;
    }
}

export const selectMopidyState = createFeatureSelector<ApplicationState, MopidyState>('mopidy');

export const selectWebSocketUrl = createSelector(selectMopidyState, (state: MopidyState) => state.webSocketUrl);
