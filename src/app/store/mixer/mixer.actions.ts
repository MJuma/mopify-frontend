import { Action } from '@ngrx/store';
import { MopidyMixerSetMuteParams, MopidyMixerSetVolumeParams } from '../../shared/types/mopidy';

export enum MixerActionTypes {
    GET_MUTE = '[Mixer] Get Mute',
    GET_MUTE_SUCCESS = '[Mixer] Get Mute Success',
    SET_MUTE = '[Mixer] Set Mute',
    SET_MUTE_SUCCESS = '[Mixer] Set Mute Success',
    GET_VOLUME = '[Mixer] Get Volume',
    GET_VOLUME_SUCCESS = '[Mixer] Get Volume Success',
    SET_VOLUME = '[Mixer] Set Volume',
    SET_VOLUME_SUCCESS = '[Mixer] Set Volume Success',
}

export class GetMute implements Action {
    readonly type = MixerActionTypes.GET_MUTE;
}

export class GetMuteSuccess implements Action {
    readonly type = MixerActionTypes.GET_MUTE_SUCCESS;

    constructor(public payload: boolean | undefined) {}
}

export class SetMute implements Action {
    readonly type = MixerActionTypes.SET_MUTE;

    constructor(public payload: MopidyMixerSetMuteParams) {}
}

export class SetMuteSuccess implements Action {
    readonly type = MixerActionTypes.SET_MUTE_SUCCESS;

    constructor(public payload: boolean) {}
}

export class GetVolume implements Action {
    readonly type = MixerActionTypes.GET_VOLUME;
}

export class GetVolumeSuccess implements Action {
    readonly type = MixerActionTypes.GET_VOLUME_SUCCESS;

    constructor(public payload: number | undefined) {}
}

export class SetVolume implements Action {
    readonly type = MixerActionTypes.SET_VOLUME;

    constructor(public payload: MopidyMixerSetVolumeParams) {}
}

export class SetVolumeSuccess implements Action {
    readonly type = MixerActionTypes.SET_VOLUME_SUCCESS;

    constructor(public payload: boolean) {}
}

export type MixerActionsUnion =
    GetMute
    | GetMuteSuccess
    | SetMute
    | SetMuteSuccess
    | GetVolume
    | GetVolumeSuccess
    | SetVolume
    | SetVolumeSuccess;
