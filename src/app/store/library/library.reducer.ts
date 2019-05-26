import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ref } from '../../shared/types/mopidy';
import { LibraryActionsUnion, LibraryActionTypes } from './library.actions';
import { ImageUris, LibraryState } from './library.state';
import { ApplicationState } from '../application/application.state';

export const initialLibraryState: LibraryState = {
    localDirectoryUri: 'local:directory',
    spotifyWebDirectoryUri: 'spotifyweb:directory',
    rootDirectories: [],
    childDirectories: [],
    songs: {
        artists: [],
        albums: [],
        tracks: [],
    },
    currentDirectoryUri: '',
    previousDirectoryUris: [],
    images: {},
};

export function libraryReducer(state: LibraryState = initialLibraryState, action: LibraryActionsUnion): LibraryState {
    switch (action.type) {
        case LibraryActionTypes.GET_ROOT_DIRECTORIES_SUCCESS:
            return {
                ...state,
                rootDirectories: action.payload,
            };
        case LibraryActionTypes.GET_LOCAL_ARTISTS_SUCCESS:
            return {
                ...state,
                songs: {
                    ...state.songs,
                    artists: action.payload,
                },
            };
        case LibraryActionTypes.GET_LOCAL_ALBUMS_SUCCESS:
            return {
                ...state,
                songs: {
                    ...state.songs,
                    albums: action.payload,
                },
            };
        case LibraryActionTypes.GET_LOCAL_TRACKS_SUCCESS:
            return {
                ...state,
                songs: {
                    ...state.songs,
                    tracks: action.payload,
                },
            };
        case LibraryActionTypes.BROWSE:
            return {
                ...state,
                previousDirectoryUris: [
                    ...state.previousDirectoryUris,
                    state.currentDirectoryUri,
                ],
                currentDirectoryUri: action.payload.uri || '',
            };
        case LibraryActionTypes.BROWSE_BACK:
            return {
                ...state,
                previousDirectoryUris: [
                    ...state.previousDirectoryUris.slice(0, state.previousDirectoryUris.length - 1),
                ],
                currentDirectoryUri: state.previousDirectoryUris[state.previousDirectoryUris.length - 1],
            };
        case LibraryActionTypes.BROWSE_SUCCESS:
            return {
                ...state,
                childDirectories: action.payload,
            };
        case LibraryActionTypes.GET_IMAGES_SUCCESS:
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

export const selectLibraryState = createFeatureSelector<ApplicationState, LibraryState>('library');

export const selectRootDirectories = createSelector(selectLibraryState, (state: LibraryState) => state.rootDirectories);
export const selectChildDirectories = createSelector(selectLibraryState, (state: LibraryState) => state.childDirectories);
export const selectArtists = createSelector(selectLibraryState, (state: LibraryState) => state.songs.artists);
export const selectAlbums = createSelector(selectLibraryState, (state: LibraryState) => state.songs.albums);
export const selectTracks = createSelector(selectLibraryState, (state: LibraryState) => state.songs.tracks);
export const selectPreviousDirectoryUris = createSelector(selectLibraryState, (state: LibraryState) => state.previousDirectoryUris);
export const selectLocalDirectoryExists = createSelector(
    selectLibraryState,
    (state: LibraryState) => !!state.rootDirectories.find((directory: Ref) => directory.uri === state.localDirectoryUri),
);
export const selectSpotifyWebDirectoryExists = createSelector(
    selectLibraryState,
    (state: LibraryState) => !!state.rootDirectories.find((directory: Ref) => directory.uri === state.spotifyWebDirectoryUri),
);
export const selectImages = createSelector(selectLibraryState, (state: LibraryState) => state.images);
