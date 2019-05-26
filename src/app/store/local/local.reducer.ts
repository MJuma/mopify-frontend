import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from '../application/application.state';
import { LocalActionsUnion, LocalActionTypes } from './local.actions';
import { ImageUris, LocalState } from './local.state';

export const initialLocalState: LocalState = {
    directories: [],
    tracks: [],
    artists: [],
    albums: [],
    images: {},
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
        case LocalActionTypes.GET_IMAGES_SUCCESS:
            const imageUris: ImageUris = Object.keys(action.payload).reduce(
                (acc: ImageUris, curr: string) => ({
                    ...acc,
                    [curr]: [...action.payload[curr]].sort((imageA, imageB) =>
                        (imageA.height * imageA.width) < (imageB.height * imageB.width) ? 1 : -1)[0].uri,
                }),
                {},
            );
            return {
                ...state,
                images: {
                    ...state.images,
                    ...imageUris,
                }
            };
        default:
            return state;
    }
}

export const selectLocalState = createFeatureSelector<ApplicationState, LocalState>('local');

export const selectArtists = createSelector(selectLocalState, (state: LocalState) => state.artists);
export const selectAlbums = createSelector(selectLocalState, (state: LocalState) => state.albums);
export const selectTracks = createSelector(selectLocalState, (state: LocalState) => state.tracks);
export const selectImages = createSelector(selectLocalState, (state: LocalState) => state.images);
