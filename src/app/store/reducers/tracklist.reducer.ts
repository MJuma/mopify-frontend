import { createSelector } from '@ngrx/store';
import { TracklistActionsUnion, TracklistActionTypes } from '../actions/tracklist.actions';
import { ApplicationState } from '../state/application.state';
import { TracklistState } from '../state/tracklist.state';

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

export const selectTracklistState = (state: ApplicationState) => state.tracklist;

export const selectTlTracks = createSelector(selectTracklistState, (state: TracklistState) => state.tlTracks);
export const selectTracks = createSelector(selectTracklistState, (state: TracklistState) => state.tracks);
