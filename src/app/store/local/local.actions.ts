import { Action } from '@ngrx/store';
import { MopidyLibraryGetImagesParams, MopidyLibraryGetImagesResponse, Ref, Track } from '../../shared/types/mopidy';

export enum LocalActionTypes {
    GET_ROOT_DIRECTORIES = '[Local] Get Root Directories',
    GET_ROOT_DIRECTORIES_SUCCESS = '[Local] Get Root Directories Success',
    GET_ARTISTS = '[Local] Get Artists',
    GET_ARTISTS_SUCCESS = '[Local] Get Artists Success',
    GET_ALBUMS = '[Local] Get Albumns',
    GET_ALBUMS_SUCCESS = '[Local] Get Albums Success',
    GET_TRACKS = '[Local] Get Tracks',
    GET_TRACKS_SUCCESS = '[Local] Get Tracks Success',
    GET_IMAGES = '[Local] Get Images',
    GET_IMAGES_SUCCESS = '[Local] Get Images Success',
}

export class GetRootDirectories implements Action {
    readonly type = LocalActionTypes.GET_ROOT_DIRECTORIES;
}

export class GetRootDirectoriesSuccess implements Action {
    readonly type = LocalActionTypes.GET_ROOT_DIRECTORIES_SUCCESS;

    constructor(public payload: Ref[]) {}
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

export class GetImages  implements Action {
    readonly type = LocalActionTypes.GET_IMAGES;

    constructor(public payload: MopidyLibraryGetImagesParams) {}
}

export class GetImagesSuccess implements Action {
    readonly type = LocalActionTypes.GET_IMAGES_SUCCESS;

    constructor(public payload: MopidyLibraryGetImagesResponse) {}
}

export type LocalActionsUnion =
    | GetRootDirectories
    | GetRootDirectoriesSuccess
    | GetArtists
    | GetArtistsSuccess
    | GetAlbums
    | GetAlbumsSuccess
    | GetTracks
    | GetTracksSuccess
    | GetImages
    | GetImagesSuccess;
