import { Action } from '@ngrx/store';
import { MusixMatchResponse, TrackList } from '../../shared/services/musix-match-lyrics.service';
import { Track } from '../../shared/types/mopidy';

export enum LyricsActionTypes {
    SEARCH_LYRICS = '[Lyrics] Search Lyrics',
    SEARCH_LYRICS_SUCCESS = '[Lyrics] Search Lyrics Success',
    GET_LYRICS = '[Lyrics] Get Lyrics',
    GET_LYRICS_SUCCESS = '[Lyrics] Get Lyrics Success',
}

export class SearchLyrics implements Action {
    readonly type = LyricsActionTypes.SEARCH_LYRICS;

    constructor(public payload: Track) {}
}

export class SearchLyricsSuccess implements Action {
    readonly type = LyricsActionTypes.SEARCH_LYRICS_SUCCESS;

    constructor(public payload: MusixMatchResponse<TrackList>) {}
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
    SearchLyrics
    | SearchLyricsSuccess
    | GetLyrics
    | GetLyricsSuccess;
