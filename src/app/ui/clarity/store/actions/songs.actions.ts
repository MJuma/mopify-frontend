import { Action } from '@ngrx/store';
import { Track } from '../../../../shared/types/mopidy';

export enum SongsActionTypes {
    SELECT_TRACKS = '[Songs] Select Tracks',
}

export class SelectTracks implements Action {
    readonly type = SongsActionTypes.SELECT_TRACKS;

    constructor(public payload: Track[]) {}
}

export type SongsActionsUnion =
    SelectTracks;
