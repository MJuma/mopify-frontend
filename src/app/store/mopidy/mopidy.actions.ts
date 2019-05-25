import { Action } from '@ngrx/store';

export enum MopidyActionTypes {
    CONNECT = '[Mopidy] Connect',
    DISCONNECT = '[Mopidy] Disconnect',
    STATE_CHANGED = '[Mopidy] State Changed',
    GET_VERSION = '[Mopidy] Get Version',
    GET_VERSION_SUCCESS = '[Mopidy] Get Version Success',
    GET_URI_SCHEMES = '[Mopidy] Get URI Schemes',
    GET_URI_SCHEMES_SUCCESS = '[Mopidy] Get URI Schemes Success',
}

export class Connect implements Action {
    readonly type = MopidyActionTypes.CONNECT;
}

export class Disconnect implements Action {
    readonly type = MopidyActionTypes.DISCONNECT;
}

export class StateChanged implements Action {
    readonly type = MopidyActionTypes.STATE_CHANGED;

    constructor(public payload: 'on' | 'off') {}
}

export class GetVersion implements Action {
    readonly type = MopidyActionTypes.GET_VERSION;
}

export class GetVersionSuccess implements Action {
    readonly type = MopidyActionTypes.GET_VERSION_SUCCESS;

    constructor(public payload: string) {}
}

export class GetUriSchemes implements Action {
    readonly type = MopidyActionTypes.GET_URI_SCHEMES;
}

export class GetUriSchemesSuccess implements Action {
    readonly type = MopidyActionTypes.GET_URI_SCHEMES_SUCCESS;

    constructor(public payload: string[]) {}
}

export type MopidyActionsUnion =
    Connect
    | Disconnect
    | StateChanged
    | GetVersion
    | GetVersionSuccess
    | GetUriSchemes
    | GetUriSchemesSuccess;
