import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from '../application/application.state';
import { PlayerActionsUnion, PlayerActionTypes } from './player.actions';
import { PlayerState } from './player.state';

export const initialPlayerState: PlayerState = {
    currentTrack: undefined,
    timePosition: 0,
    playbackState: 'stopped',
};

export function playerReducer(state: PlayerState = initialPlayerState, action: PlayerActionsUnion): PlayerState {
    switch (action.type) {
        case PlayerActionTypes.GET_CURRENT_TRACK_SUCCESS:
            return {
                ...state,
                currentTrack: action.payload,
            };
        case PlayerActionTypes.GET_TIME_POSITION_SUCCESS:
            return {
                ...state,
                timePosition: action.payload || 0,
            };
        case PlayerActionTypes.GET_PLAYBACK_STATE_SUCCESS:
            return {
                ...state,
                playbackState: action.payload,
            };
        default:
            return state;
    }
}

export const selectPlayerState = createFeatureSelector<ApplicationState, PlayerState>('player');

export const selectCurrentTrack = createSelector(selectPlayerState, (state: PlayerState) => state.currentTrack);
export const selectTimePosition = createSelector(selectPlayerState, (state: PlayerState) => state.timePosition);
export const selectPlaybackState = createSelector(selectPlayerState, (state: PlayerState) => state.playbackState);
