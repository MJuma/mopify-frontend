import { Action } from '@ngrx/store';

export enum MaterialActionTypes {
    SET_THEME = '[Material] Set Theme',
}

export class SetTheme implements Action {
    readonly type = MaterialActionTypes.SET_THEME;

    constructor(public payload: string) {}
}

export type MaterialActionsUnion =
    SetTheme;
