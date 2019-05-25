import { Action } from '@ngrx/store';
import { MopidyPlaybackPlayParams, PlaybackState, Track } from '../../shared/types/mopidy';

export enum PlayerActionTypes {
    GET_CURRENT_TRACK = '[Player] Get Current Track',
    GET_CURRENT_TRACK_SUCCESS = '[Player] Get Current Track Success',
    GET_STREAM_TITLE = '[Player] Get Stream Title',
    GET_STREAM_TITLE_SUCCESS = '[Player] Get Stream Title Success',
    GET_TIME_POSITION = '[Player] Get Time Position',
    GET_TIME_POSITION_SUCCESS = '[Player] Get Time Position Success',
    GET_PLAYBACK_STATE = '[Player] Get Playback State',
    GET_PLAYBACK_STATE_SUCCESS = '[Player] Get Playback State Success',
    PLAY = '[Player] Play',
    TOGGLE_PLAY_PAUSE = '[Player] Toggle Play Pause',
    PAUSE = '[Player] Pause',
    RESUME = '[Player] Resume',
    STOP = '[Player] Stop',
    FORWARD = '[Player] Forward',
    BACK = '[Player] Back',
}

export class GetCurrentTrack implements Action {
    readonly type = PlayerActionTypes.GET_CURRENT_TRACK;
}

export class GetCurrentTrackSuccess implements Action {
    readonly type = PlayerActionTypes.GET_CURRENT_TRACK_SUCCESS;

    constructor(public payload: Track | undefined) {}
}

export class GetStreamTitle implements Action {
    readonly type = PlayerActionTypes.GET_STREAM_TITLE;
}

export class GetStreamTitleSuccess implements Action {
    readonly type = PlayerActionTypes.GET_STREAM_TITLE_SUCCESS;

    constructor(public payload: string | undefined) {}
}

export class GetTimePosition implements Action {
    readonly type = PlayerActionTypes.GET_TIME_POSITION;
}

export class GetTimePositionSuccess implements Action {
    readonly type = PlayerActionTypes.GET_TIME_POSITION_SUCCESS;

    constructor(public payload: number | undefined) {}
}

export class GetPlaybackState implements Action {
    readonly type = PlayerActionTypes.GET_PLAYBACK_STATE;
}

export class GetPlaybackStateSuccess implements Action {
    readonly type = PlayerActionTypes.GET_PLAYBACK_STATE_SUCCESS;

    constructor(public payload: PlaybackState) {}
}

export class Play implements Action {
    readonly type = PlayerActionTypes.PLAY;

    constructor(public payload: MopidyPlaybackPlayParams) {}
}

export class TogglePlayPause implements Action {
    readonly type = PlayerActionTypes.TOGGLE_PLAY_PAUSE;
}

export class Pause implements Action {
    readonly type = PlayerActionTypes.PAUSE;
}

export class Resume implements Action {
    readonly type = PlayerActionTypes.RESUME;
}

export class Stop implements Action {
    readonly type = PlayerActionTypes.STOP;
}

export class Forward implements Action {
    readonly type = PlayerActionTypes.FORWARD;
}

export class Back implements Action {
    readonly type = PlayerActionTypes.BACK;
}

export type PlayerActionsUnion =
    | GetCurrentTrack
    | GetCurrentTrackSuccess
    | GetStreamTitle
    | GetStreamTitleSuccess
    | GetTimePosition
    | GetTimePositionSuccess
    | GetPlaybackState
    | GetPlaybackStateSuccess
    | Play
    | TogglePlayPause
    | Pause
    | Resume
    | Stop
    | Forward
    | Back;
