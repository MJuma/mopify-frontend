import { Action } from '@ngrx/store';
import { Track } from '../../shared/types/mopidy';

export enum LyricsActionTypes {
    GET_LYRICS = '[Lyrics] Get Lyrics',
    GET_LYRICS_SUCCESS = '[Lyrics] Get Lyrics Success',
}

export class GetLyrics implements Action {
    readonly type = LyricsActionTypes.GET_LYRICS;

    constructor(public payload: Track) {}
}

export class GetLyricsSuccess implements Action {
    readonly type = LyricsActionTypes.GET_LYRICS_SUCCESS;

    constructor(public payload: {trackUri: string, lyrics: string}) {}
}

export type LyricsActionsUnion =
    GetLyrics
    | GetLyricsSuccess;
