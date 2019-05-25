import { ActionReducerMap } from '@ngrx/store';
import { ClarityUiState } from '../state/clarity-ui.state';
// import { initialSongsState, songsReducer } from './songs.reducer';

export const initialClarityUiState: Readonly<ClarityUiState> = {
    // songs: initialSongsState,
};

export const clarityUiReducer: ActionReducerMap<ClarityUiState> = {
    // songs: songsReducer,
};
