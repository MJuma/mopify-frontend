import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MixerActionsUnion, MixerActionTypes } from './mixer.actions';
import { MixerState } from './mixer.state';
import { ApplicationState } from '../application/application.state';

export const initialMixerState: MixerState = {
    muteState: false,
    volume: undefined,
};

export function mixerReducer(state: MixerState = initialMixerState, action: MixerActionsUnion): MixerState {
    switch (action.type) {
        case MixerActionTypes.GET_MUTE_SUCCESS:
            return {
                ...state,
                muteState: action.payload,
            };
        case MixerActionTypes.GET_VOLUME_SUCCESS:
            return {
                ...state,
                volume: action.payload,
            };
        default:
            return state;
    }
}

export const selectMixerState = createFeatureSelector<ApplicationState, MixerState>('mixer');

export const selectMuteState = createSelector(selectMixerState, (state: MixerState) => state.muteState);
export const selectVolume = createSelector(selectMixerState, (state: MixerState) => state.volume);
