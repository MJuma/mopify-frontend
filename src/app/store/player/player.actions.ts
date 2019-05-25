import { Action } from '@ngrx/store';
import { MopidyPlaybackPlayParams } from '../../shared/types/mopidy';

export enum PlayerActionTypes {
    PLAY = '[Player] Play',
    TOGGLE_PLAY_PAUSE = '[Player] Toggle Play Pause',
    PAUSE = '[Player] Pause',
    RESUME = '[Player] Resume',
    STOP = '[Player] Stop',
    FORWARD = '[Player] Forward',
    BACK = '[Player] Back',
    TOGGLE_SHUFFLE = '[Player] Toggle Shuffle',
    TOGGLE_REPEAT = '[Player] Toggle Repeat',
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

export class ToggleShuffle implements Action {
    readonly type = PlayerActionTypes.TOGGLE_SHUFFLE;
}

export class ToggleRepeat implements Action {
    readonly type = PlayerActionTypes.TOGGLE_REPEAT;
}

export type PlayerActionsUnion =
    Play
    | TogglePlayPause
    | Pause
    | Resume
    | Stop
    | Forward
    | Back
    | ToggleShuffle
    | ToggleRepeat;
