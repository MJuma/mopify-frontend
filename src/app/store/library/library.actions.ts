import { Action } from '@ngrx/store';
import { MopidyLibraryBrowseRefreshParams, Ref } from '../../shared/types/mopidy';

export enum LibraryActionTypes {
    GET_ROOT_DIRECTORIES = '[Library] Get Root Directories',
    GET_ROOT_DIRECTORIES_SUCCESS = '[Library] Get Root Directories Success',
    BROWSE_LOCAL = '[Library] Browse Local',
    BROWSE = '[Library] Browse',
    BROWSE_BACK = '[Library] Browse Back',
    BROWSE_SUCCESS = '[Library] Browse Success',
    BROWSE_BACK_SUCCESS = '[Library] Browse Back Success',
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

export type LibraryActionsUnion =
    GetRootDirectories
    | GetRootDirectoriesSuccess
    | BrowseLocal
    | Browse
    | BrowseSuccess
    | BrowseBack;
