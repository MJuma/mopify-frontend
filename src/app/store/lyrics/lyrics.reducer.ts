import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LyricsActionsUnion, LyricsActionTypes } from './lyrics.actions';
import { LyricsState } from './lyrics.state';
import { ApplicationState } from '../application/application.state';

export const initialLyricsState: LyricsState = {
    lyrics: {},
};

export function lyricsReducer(state: LyricsState = initialLyricsState, action: LyricsActionsUnion): LyricsState {
    switch (action.type) {
        case LyricsActionTypes.GET_LYRICS_SUCCESS:
            return {
                ...state,
                lyrics: {
                    ...state.lyrics,
                    [action.payload.trackUri]: action.payload.lyrics,
                },
            };
        default:
            return state;
    }
}

export const selectLyricsState = createFeatureSelector<ApplicationState, LyricsState>('lyrics');

export const selectLyrics = createSelector(selectLyricsState, (state: LyricsState) => state.lyrics);
