import { Action } from '@ngrx/store';
import { MopidyLibrarySearchParams, Ref, Track } from '../../../../shared/types/mopidy';
import { MopidyDirectoriesMap } from '../../../../shared/types/mopidy-directories-map';

export enum LocalActionTypes {
    GET_ROOT_DIRECTORIES = '[Local] Get Root Directories',
    GET_ROOT_DIRECTORIES_SUCCESS = '[Local] Get Root Directories Success',
    GET_DIRECTORY = '[Local] Get Directory',
    GET_DIRECTORY_SUCCESS = '[Local] Get Directory Success',
    SEARCH_LIBRARY = '[Local] Search Library',
    GET_ARTISTS = '[Local] Get Artists',
    GET_ARTISTS_SUCCESS = '[Local] Get Artists Success',
    GET_ALBUMS = '[Local] Get Albumns',
    GET_ALBUMS_SUCCESS = '[Local] Get Albums Success',
    GET_TRACKS = '[Local] Get Tracks',
    GET_TRACKS_SUCCESS = '[Local] Get Tracks Success',
    PLAY_TRACK = '[Local] Play Track',
}

export class GetRootDirectories implements Action {
    readonly type = LocalActionTypes.GET_ROOT_DIRECTORIES;
}

export class GetRootDirectoriesSuccess implements Action {
    readonly type = LocalActionTypes.GET_ROOT_DIRECTORIES_SUCCESS;

    constructor(public payload: Ref[]) {}
}

export class GetDirectory implements Action {
    readonly type = LocalActionTypes.GET_DIRECTORY;

    constructor(public payload: string) {}
}

export class GetDirectorySuccess implements Action {
    readonly type = LocalActionTypes.GET_DIRECTORY_SUCCESS;

    constructor(public payload: MopidyDirectoriesMap) {}
}

export class SearchLibrary implements Action {
    readonly type = LocalActionTypes.SEARCH_LIBRARY;

    constructor(public payload: MopidyLibrarySearchParams) {}
}

export class GetArtists implements Action {
    readonly type = LocalActionTypes.GET_ARTISTS;

    constructor(public payload: string) {}
}

export class GetArtistsSuccess implements Action {
    readonly type = LocalActionTypes.GET_ARTISTS_SUCCESS;

    constructor(public payload: Ref[]) {}
}

export class GetAlbums implements Action {
    readonly type = LocalActionTypes.GET_ALBUMS;

    constructor(public payload: string) {}
}

export class GetAlbumsSuccess implements Action {
    readonly type = LocalActionTypes.GET_ALBUMS_SUCCESS;

    constructor(public payload: Ref[]) {}
}

export class GetTracks implements Action {
    readonly type = LocalActionTypes.GET_TRACKS;

    constructor(public payload: string) {}
}

export class GetTracksSuccess implements Action {
    readonly type = LocalActionTypes.GET_TRACKS_SUCCESS;

    constructor(public payload: Track[]) {}
}

export class PlayTrack implements Action {
    readonly type = LocalActionTypes.PLAY_TRACK;

    constructor(public payload: string) {}
}

export type LocalActionsUnion =
    | GetRootDirectories
    | GetRootDirectoriesSuccess
    | GetDirectory
    | GetDirectorySuccess
    | GetArtists
    | GetArtistsSuccess
    | GetAlbums
    | GetAlbumsSuccess
    | GetTracks
    | GetTracksSuccess
    | PlayTrack;
