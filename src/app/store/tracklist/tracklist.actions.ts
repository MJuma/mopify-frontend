import { Action } from '@ngrx/store';
import { TlTrack } from '../../shared/types/mopidy';

export enum TracklistActionTypes {
    ADD = '[Tracklist] Add',
    ADD_SUCCESS = '[Tracklist] Add Success',
    REMOVE = '[Tracklist] Remove',
    CLEAR = '[Tracklist] Clear',
    MOVE = '[Tracklist] Move',
    SHUFFLE = '[Tracklist] Shuffle',
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
}

export class GetTlTracks implements Action {
    readonly type = TracklistActionTypes.GET_TL_TRACKS;
}

export class GetTlTracksSuccess implements Action {
    readonly type = TracklistActionTypes.GET_TL_TRACKS_SUCCESS;

    constructor(public payload: TlTrack[]) {}
}

export type TracklistActionsUnion =
    GetTlTracks
    | GetTlTracksSuccess;
