import { createSelector } from '@ngrx/store';
import { LocalActionsUnion, LocalActionTypes } from '../actions/local.actions';
import { selectLocalRootState } from '../index';
import { LocalRootState } from '../state/local-root.state';
import { LocalState } from '../state/local.state';

export const initialLocalState: LocalState = {
    directories: [],
    tracks: [],
    artists: [],
    albums: [],
};

export function localReducer(state: LocalState = initialLocalState, action: LocalActionsUnion): LocalState {
    switch (action.type) {
        case LocalActionTypes.GET_ROOT_DIRECTORIES_SUCCESS:
            return {
                ...state,
                directories: action.payload,
            };
        case LocalActionTypes.GET_ARTISTS_SUCCESS:
            return {
                ...state,
                artists: action.payload,
            };
        case LocalActionTypes.GET_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.payload,
            };
        case LocalActionTypes.GET_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.payload,
            };
        default:
            return state;
    }
}

export const selectLocalState = createSelector(selectLocalRootState, (state: LocalRootState) => state.local);

export const selectArtists = createSelector(selectLocalState, (state: LocalState) => state.artists);
export const selectAlbums = createSelector(selectLocalState, (state: LocalState) => state.albums);
export const selectTracks = createSelector(selectLocalState, (state: LocalState) => state.tracks);
