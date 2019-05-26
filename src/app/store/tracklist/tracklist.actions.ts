import { Action } from '@ngrx/store';
import {
    MopidyTracklistAddParams,
    MopidyTracklistFilterParams, MopidyTracklistIndexParams,
    MopidyTracklistMoveParams, MopidyTracklistOptionsParams, MopidyTracklistShuffleParams,
    TlTrack,
    Track
} from '../../shared/types/mopidy';

export enum TracklistActionTypes {
    // Manipulating
    QUEUE_NOW = '[Tracklist] Queue Now',
    QUEUE_NEXT = '[Tracklist] Queue Next',
    QUEUE_LAST = '[Tracklist] Queue Last',
    ADD = '[Tracklist] Add',
    ADD_SUCCESS = '[Tracklist] Add Success',
    REMOVE = '[Tracklist] Remove',
    REMOVE_SUCCESS = '[Tracklist] Remove Success',
    CLEAR = '[Tracklist] Clear',
    CLEAR_SUCCESS = '[Tracklist] Clear Success',
    MOVE = '[Tracklist] Move',
    MOVE_SUCESS = '[Tracklist] Move Success',
    SHUFFLE = '[Tracklist] Shuffle',
    SHUFFLE_SUCCESS = '[Tracklist] Shuffle Success',

    // Current State
    GET_TL_TRACKS = '[Tracklist] Get Tl Tracks',
    GET_TL_TRACKS_SUCCESS = '[Tracklist] Get Tl Tracks Success',
    INDEX = '[Tracklist] Index',
    INDEX_SUCCESS = '[Tracklist] Index Success',
    GET_VERSION = '[Tracklist] Get Version',
    GET_VERSION_SUCCESS = '[Tracklist] Get Version Success',
    GET_LENGTH = '[Tracklist] Get Length',
    GET_LENGTH_SUCCESS= '[Tracklist] Get Length Success',
    GET_TRACKS = '[Tracklist] Get Tracks',
    GET_TRACKS_SUCCESS = '[Tracklist] Get Tracks Success',
    SLICE = '[Tracklist] Slice',
    SLICE_SUCCESS = '[Tracklist] Slice Success',
    FILTER = '',

    // Future State

    // Options
    GET_CONSUME = '[Tracklist] Get Consume',
    GET_CONSUME_SUCCESS = '[Tracklist] Get Consume Success',
    SET_CONSUME = '[Tracklist] Set Consume',
    GET_RANDOM = '[Tracklist] Get Random',
    GET_RANDOM_SUCCESS = '[Tracklist] Get Random Success',
    SET_RANDOM = '[Tracklist] Set Random',
    GET_REPEAT = '[Tracklist] Get Repeat',
    GET_REPEAT_SUCCESS = '[Tracklist] Get Repeat Success',
    SET_REPEAT = '[Tracklist] Set Repeat',
    GET_SINGLE = '[Tracklist] Get Single',
    GET_SINGLE_SUCCESS = '[Tracklist] Get Single Success',
    SET_SINGLE = '[Tracklist] Set Single',
    TOGGLE_SHUFFLE = '[Tracklist] Toggle Shuffle',
    TOGGLE_REPEAT = '[Tracklist] Toggle Repeat',
}

export class QueueNow implements Action {
    readonly type = TracklistActionTypes.QUEUE_NOW;

    constructor(public payload: Track[]) {}
}

export class QueueNext implements Action {
    readonly type = TracklistActionTypes.QUEUE_NEXT;

    constructor(public payload: Track[]) {}
}

export class QueueLast implements Action {
    readonly type = TracklistActionTypes.QUEUE_LAST;

    constructor(public payload: Track[]) {}
}

export class Add implements Action {
    readonly type = TracklistActionTypes.ADD;

    constructor(public payload: MopidyTracklistAddParams) {}
}

export class AddSuccess implements Action {
    readonly type = TracklistActionTypes.ADD_SUCCESS;

    constructor(public payload: TlTrack[]) {}
}

export class Remove implements Action {
    readonly type = TracklistActionTypes.REMOVE;

    constructor(public payload: MopidyTracklistFilterParams) {}
}

export class RemoveSuccess implements Action {
    readonly type = TracklistActionTypes.REMOVE_SUCCESS;

    constructor(public payload: TlTrack[]) {}
}

export class Clear implements Action {
    readonly type = TracklistActionTypes.CLEAR;
}

export class ClearSuccess implements Action {
    readonly type = TracklistActionTypes.CLEAR_SUCCESS;
}

export class Move implements Action {
    readonly type = TracklistActionTypes.MOVE;

    constructor(public payload: MopidyTracklistMoveParams) {}
}

export class MoveSuccess implements Action {
    readonly type = TracklistActionTypes.MOVE_SUCESS;
}


export class Shuffle implements Action {
    readonly type = TracklistActionTypes.SHUFFLE;

    constructor(public payload: MopidyTracklistShuffleParams) {}
}

export class ShuffleSuccess implements Action {
    readonly type = TracklistActionTypes.SHUFFLE_SUCCESS;
}

export class GetTlTracks implements Action {
    readonly type = TracklistActionTypes.GET_TL_TRACKS;
}

export class GetTlTracksSuccess implements Action {
    readonly type = TracklistActionTypes.GET_TL_TRACKS_SUCCESS;

    constructor(public payload: TlTrack[]) {}
}

export class Index implements Action {
    readonly type = TracklistActionTypes.INDEX;

    constructor(public payload: MopidyTracklistIndexParams) {}
}

export class IndexSuccess implements Action {
    readonly type = TracklistActionTypes.INDEX_SUCCESS;

    constructor(public payload: number) {}
}

export class GetConsume implements Action {
    readonly type = TracklistActionTypes.GET_CONSUME;
}

export class GetConsumeSuccess implements Action {
    readonly type = TracklistActionTypes.GET_CONSUME_SUCCESS;

    constructor(public payload: boolean) {}
}

export class SetConsume implements Action {
    readonly type = TracklistActionTypes.SET_CONSUME;

    constructor(public payload: MopidyTracklistOptionsParams) {}
}

export class GetRandom implements Action {
    readonly type = TracklistActionTypes.GET_RANDOM;
}

export class GetRandomSuccess implements Action {
    readonly type = TracklistActionTypes.GET_RANDOM_SUCCESS;

    constructor(public payload: boolean) {}
}

export class SetRandom implements Action {
    readonly type = TracklistActionTypes.SET_RANDOM;

    constructor(public payload: MopidyTracklistOptionsParams) {}
}

export class GetRepeat implements Action {
    readonly type = TracklistActionTypes.GET_REPEAT;
}

export class GetRepeatSuccess implements Action {
    readonly type = TracklistActionTypes.GET_REPEAT_SUCCESS;

    constructor(public payload: boolean) {}
}

export class SetRepeat implements Action {
    readonly type = TracklistActionTypes.SET_REPEAT;

    constructor(public payload: MopidyTracklistOptionsParams) {}
}

export class GetSingle implements Action {
    readonly type = TracklistActionTypes.GET_SINGLE;
}

export class GetSingleSuccess implements Action {
    readonly type = TracklistActionTypes.GET_SINGLE_SUCCESS;

    constructor(public payload: boolean) {}
}

export class SetSingle implements Action {
    readonly type = TracklistActionTypes.SET_SINGLE;

    constructor(public payload: MopidyTracklistOptionsParams) {}
}

export class ToggleShuffle implements Action {
    readonly type = TracklistActionTypes.TOGGLE_SHUFFLE;
}

export class ToggleRepeat implements Action {
    readonly type = TracklistActionTypes.TOGGLE_REPEAT;
}

export type TracklistActionsUnion =
    QueueNow
    | QueueNext
    | QueueLast
    | Add
    | AddSuccess
    | Remove
    | RemoveSuccess
    | Clear
    | ClearSuccess
    | Move
    | MoveSuccess
    | Shuffle
    | ShuffleSuccess
    | GetTlTracks
    | GetTlTracksSuccess
    | Index
    | IndexSuccess
    | GetConsume
    | GetConsumeSuccess
    | SetConsume
    | GetRandom
    | GetRandomSuccess
    | SetRandom
    | GetRepeat
    | GetRepeatSuccess
    | SetRepeat
    | GetSingle
    | GetSingleSuccess
    | SetSingle
    | ToggleShuffle
    | ToggleRepeat;
