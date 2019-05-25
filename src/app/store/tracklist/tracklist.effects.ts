import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy/mopidy.service';
import { MopidyTracklistAddParams, TlTrack, Track } from '../../shared/types/mopidy';
import * as TracklistActions from './tracklist.actions';
import { TracklistActionTypes } from './tracklist.actions';

@Injectable()
export class TracklistEffects {

    @Effect()
    readonly afterConnect$ = this.actions.pipe(
        ofType('[Mopidy Event] State: Online'),
        map(() => new TracklistActions.GetTlTracks()),
    );

    @Effect()
    readonly queueNext$ = this.actions.pipe(
        ofType(TracklistActionTypes.QUEUE_NEXT),
        map(({ payload }: TracklistActions.QueueNext) => payload),
        map((tracks: Track[]) => tracks.map((track: Track) => track.uri)),
        map((trackUris: string[]) => new TracklistActions.Add({uris: trackUris})),
    );

    @Effect()
    readonly queueLast$ = this.actions.pipe(
        ofType(TracklistActionTypes.QUEUE_LAST),
        map(({ payload }: TracklistActions.QueueLast) => payload),
        map((tracks: Track[]) => tracks.map((track: Track) => track.uri)),
        map((trackUris: string[]) => new TracklistActions.Add({uris: trackUris})),
    );

    @Effect()
    readonly add$ = this.actions.pipe(
        ofType(TracklistActionTypes.ADD),
        map(({ payload }: TracklistActions.Add) => payload),
        switchMap((params: MopidyTracklistAddParams) => this.mopidy.tracklistAdd(params)),
        map((tlTracks: TlTrack[]) => new TracklistActions.AddSuccess(tlTracks)),
    );

    @Effect()
    readonly getTlTracks$ = this.actions.pipe(
        ofType(TracklistActionTypes.GET_TL_TRACKS),
        switchMap(() => this.mopidy.tracklistGetTlTracks()),
        map((tlTracks: TlTrack[]) => new TracklistActions.GetTlTracksSuccess(tlTracks)),
    );

    constructor(private actions: Actions,
                private mopidy: MopidyService) {
    }
}
