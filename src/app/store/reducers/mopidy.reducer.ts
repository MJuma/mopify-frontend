import { createSelector } from '@ngrx/store';
import { MopidyActionsUnion, MopidyActionTypes } from '../actions/mopidy.actions';
import { ApplicationState } from '../state/application.state';
import { MopidyState } from '../state/mopidy.state';

export const initialMopidyState: MopidyState = {
    version: '',
    uriSchemes: [],
    state: 'off',
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

export const selectMopidyState = (state: ApplicationState) => state.mopidy;

export const selectMopidyConnectionState = createSelector(selectMopidyState, (state: MopidyState) => state.state);
