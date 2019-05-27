import { Action } from '@ngrx/store';
import {
    MopidyLibraryBrowseRefreshParams,
    MopidyLibraryGetImagesParams,
    MopidyLibraryGetImagesResponse,
    MopidyLibrarySearchParams,
    Ref, SearchResult,
    Track,
} from '../../shared/types/mopidy';

export enum LibraryActionTypes {
    GET_ROOT_DIRECTORIES = '[Library] Get Root Directories',
    GET_ROOT_DIRECTORIES_SUCCESS = '[Library] Get Root Directories Success',
    GET_LOCAL_ARTISTS = '[Library] Get Local Artists',
    GET_LOCAL_ARTISTS_SUCCESS = '[Library] Get Local Artists Success',
    GET_LOCAL_ALBUMS = '[Library] Get Local Albums',
    GET_LOCAL_ALBUMS_SUCCESS = '[Library] Get Local Albums Success',
    GET_LOCAL_TRACKS = '[Library] Get Local Tracks',
    GET_LOCAL_TRACKS_SUCCESS = '[Library] Get Local Tracks Success',
    BROWSE_LOCAL = '[Library] Browse Local',
    BROWSE = '[Library] Browse',
    BROWSE_BACK = '[Library] Browse Back',
    BROWSE_SUCCESS = '[Library] Browse Success',
    SEARCH = '[Library] Search',
    SEARCH_SUCCESS = '[Library] Search Success',
    LOOKUP = '[Library] Lookup',
    LOOKUP_SUCCESS = '[Library] Lookup Success',
    REFRESH = '[Library] Refresh',
    REFRESH_SUCCESS = '[Library] Refresh Success',
    GET_IMAGES = '[Library] Get Images',
    GET_IMAGES_SUCCESS = '[Library] Get Images Success',
    GET_DISTINCT = '[Library] Get Distinct',
    GET_DISTINCT_SUCCESS = '[Library] Get Distinct Success',
}


export class GetRootDirectories implements Action {
    readonly type = LibraryActionTypes.GET_ROOT_DIRECTORIES;
}

export class GetRootDirectoriesSuccess implements Action {
    readonly type = LibraryActionTypes.GET_ROOT_DIRECTORIES_SUCCESS;

    constructor(public payload: Ref[]) {}
}

export class GetLocalArtists implements Action {
    readonly type = LibraryActionTypes.GET_LOCAL_ARTISTS;
}

export class GetLocalArtistsSuccess implements Action {
    readonly type = LibraryActionTypes.GET_LOCAL_ARTISTS_SUCCESS;

    constructor(public payload: Ref[]) {}
}

export class GetLocalAlbums implements Action {
    readonly type = LibraryActionTypes.GET_LOCAL_ALBUMS;

    constructor(public payload: string) {}
}

export class GetLocalAlbumsSuccess implements Action {
    readonly type = LibraryActionTypes.GET_LOCAL_ALBUMS_SUCCESS;

    constructor(public payload: Ref[]) {}
}

export class GetLocalTracks implements Action {
    readonly type = LibraryActionTypes.GET_LOCAL_TRACKS;

    constructor(public payload: string) {}
}

export class GetLocalTracksSuccess implements Action {
    readonly type = LibraryActionTypes.GET_LOCAL_TRACKS_SUCCESS;

    constructor(public payload: Track[]) {}
}

export class BrowseLocal implements Action {
    readonly type = LibraryActionTypes.BROWSE_LOCAL;
}

export class Browse implements Action {
    readonly type = LibraryActionTypes.BROWSE;

    constructor(public payload: MopidyLibraryBrowseRefreshParams) {}
}

export class BrowseBack implements Action {
    readonly type = LibraryActionTypes.BROWSE_BACK;

    constructor(public payload: string) {}
}

export class BrowseSuccess implements Action {
    readonly type = LibraryActionTypes.BROWSE_SUCCESS;

    constructor(public payload: Ref[]) {}
}

export class Search implements Action {
    readonly type = LibraryActionTypes.SEARCH;

    constructor(public payload: MopidyLibrarySearchParams) {}
}

export class SearchSuccess implements Action {
    readonly type = LibraryActionTypes.SEARCH_SUCCESS;

    constructor(public payload: SearchResult) {}
}

export class GetImages  implements Action {
    readonly type = LibraryActionTypes.GET_IMAGES;

    constructor(public payload: MopidyLibraryGetImagesParams) {}
}

export class GetImagesSuccess implements Action {
    readonly type = LibraryActionTypes.GET_IMAGES_SUCCESS;

    constructor(public payload: MopidyLibraryGetImagesResponse) {}
}

export type LibraryActionsUnion =
    GetRootDirectories
    | GetRootDirectoriesSuccess
    | GetLocalArtists
    | GetLocalArtistsSuccess
    | GetLocalAlbums
    | GetLocalAlbumsSuccess
    | GetLocalTracks
    | GetLocalTracksSuccess
    | BrowseLocal
    | Browse
    | BrowseBack
    | BrowseSuccess
    | Search
    | SearchSuccess
    | GetImages
    | GetImagesSuccess;
