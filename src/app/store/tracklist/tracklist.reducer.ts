import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from '../application/application.state';
import { TracklistActionsUnion, TracklistActionTypes } from './tracklist.actions';
import { RepeatState, ShuffleState, TracklistState } from './tracklist.state';

export const initialTracklistState: TracklistState = {
    tlTracks: [],
    index: undefined,
    version: 0,
    length: 0,
    tracks: [],
    consumeMode: false,
    randomMode: false,
    repeatMode: false,
    singleMode: false,
};

export function tracklistReducer(state: TracklistState = initialTracklistState, action: TracklistActionsUnion): TracklistState {
    switch (action.type) {
        case TracklistActionTypes.GET_TL_TRACKS_SUCCESS:
            return {
                ...state,
                tlTracks: action.payload,
            };
        case TracklistActionTypes.INDEX_SUCCESS:
            return {
                ...state,
                index: action.payload,
            };
        case TracklistActionTypes.GET_CONSUME_SUCCESS:
            return {
                ...state,
                consumeMode: action.payload
            };
        case TracklistActionTypes.GET_RANDOM_SUCCESS:
            return {
                ...state,
                randomMode: action.payload,
            };
        case TracklistActionTypes.GET_REPEAT_SUCCESS:
            return {
                ...state,
                repeatMode: action.payload,
            };
        case TracklistActionTypes.GET_SINGLE_SUCCESS:
            return {
                ...state,
                singleMode: action.payload,
            };
        default:
            return state;
    }
}

export const selectTracklistState = createFeatureSelector<ApplicationState, TracklistState>('tracklist');

export const selectTlTracks = createSelector(selectTracklistState, (state: TracklistState) => state.tlTracks);
export const selectIndex = createSelector(selectTracklistState, (state: TracklistState) => state.index);

export const selectShuffleState = createSelector(
    selectTracklistState,
    (state: TracklistState) => state.randomMode
        ? ShuffleState.ON
        : ShuffleState.OFF,
);

export const selectRepeatState = createSelector(
    selectTracklistState,
    (state: TracklistState) => state.repeatMode
        ? state.singleMode
            ? RepeatState.SINGLE
            : RepeatState.ALL
        : RepeatState.OFF,
);

export const selectConsume = createSelector(selectTracklistState, (state: TracklistState) => state.consumeMode);
