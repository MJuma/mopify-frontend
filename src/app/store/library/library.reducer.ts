import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ref } from '../../shared/types/mopidy';
import { LibraryActionsUnion, LibraryActionTypes } from './library.actions';
import { LibraryState } from './library.state';
import { ApplicationState } from '../application/application.state';

export const initialLibraryState: LibraryState = {
    localDirectoryUri: 'local:directory',
    spotifyWebDirectoryUri: 'spotifyweb:directory',
    rootDirectories: [],
    childDirectories: [],
    currentDirectoryUri: '',
    previousDirectoryUris: [],
};

export function libraryReducer(state: LibraryState = initialLibraryState, action: LibraryActionsUnion): LibraryState {
    switch (action.type) {
        case LibraryActionTypes.GET_ROOT_DIRECTORIES_SUCCESS:
            return {
                ...state,
                rootDirectories: action.payload,
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
        default:
            return state;
    }
}

export const selectLibraryState = createFeatureSelector<ApplicationState, LibraryState>('library');

export const selectRootDirectories = createSelector(selectLibraryState, (state: LibraryState) => state.rootDirectories);
export const selectCurrentDirectories = createSelector(selectLibraryState, (state: LibraryState) => state.childDirectories);
export const selectPreviousDirectoryUris = createSelector(selectLibraryState, (state: LibraryState) => state.previousDirectoryUris);
export const selectLocalDirectoryExists = createSelector(
    selectLibraryState,
    (state: LibraryState) => !!state.rootDirectories.find((directory: Ref) => directory.uri === state.localDirectoryUri),
);
export const selectSpotifyWebDirectoryExists = createSelector(
    selectLibraryState,
    (state: LibraryState) => !!state.rootDirectories.find((directory: Ref) => directory.uri === state.spotifyWebDirectoryUri),
);
