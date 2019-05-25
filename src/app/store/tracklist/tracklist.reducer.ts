import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TracklistActionsUnion, TracklistActionTypes } from './tracklist.actions';
import { ApplicationState } from '../application/application.state';
import { TracklistState } from './tracklist.state';

export const initialTracklistState: TracklistState = {
    version: 0,
    length: 0,
    tracks: [],
    tlTracks: [],
};

export function tracklistReducer(state: TracklistState = initialTracklistState, action: TracklistActionsUnion): TracklistState {
    switch (action.type) {
        case TracklistActionTypes.GET_TL_TRACKS_SUCCESS:
            return {
                ...state,
                tlTracks: action.payload,
            };
        default:
            return state;
    }
}

export const selectTracklistState = createFeatureSelector<ApplicationState, TracklistState>('tracklist');

export const selectTlTracks = createSelector(selectTracklistState, (state: TracklistState) => state.tlTracks);
export const selectTracks = createSelector(selectTracklistState, (state: TracklistState) => state.tracks);
