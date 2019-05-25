import { SongsActionsUnion } from '../actions/songs.actions';
import { SongsState } from '../state/songs.state';

export const initialSongsState: SongsState = {
    selectedTracks: [],
};

export function songsReducer(state: SongsState = initialSongsState, action: SongsActionsUnion): SongsState {
    switch (action.type) {
        default:
            return state;
    }
}

// export const selectSongsState = createSelector(selectClarityUiState, (state: ClarityUiState) => state.songs);

// export const selectSelectedTracks = createSelector(selectSongsState, (state: SongsState) => state.selectedTracks);
