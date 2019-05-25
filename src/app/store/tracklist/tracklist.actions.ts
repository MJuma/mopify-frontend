import { Action } from '@ngrx/store';
import { MopidyTracklistAddParams, TlTrack, Track } from '../../shared/types/mopidy';

export enum TracklistActionTypes {
    // Manipulating
    QUEUE_NEXT = '[Tracklist] Queue Next',
    QUEUE_LAST = '[Tracklist] Queue Last',
    ADD = '[Tracklist] Add',
    ADD_SUCCESS = '[Tracklist] Add Success',
    REMOVE = '[Tracklist] Remove',
    CLEAR = '[Tracklist] Clear',
    MOVE = '[Tracklist] Move',
    SHUFFLE = '[Tracklist] Shuffle',

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

export class GetTlTracks implements Action {
    readonly type = TracklistActionTypes.GET_TL_TRACKS;
}

export class GetTlTracksSuccess implements Action {
    readonly type = TracklistActionTypes.GET_TL_TRACKS_SUCCESS;

    constructor(public payload: TlTrack[]) {}
}

export type TracklistActionsUnion =
    QueueNext
    | QueueLast
    | Add
    | AddSuccess
    | GetTlTracks
    | GetTlTracksSuccess;
