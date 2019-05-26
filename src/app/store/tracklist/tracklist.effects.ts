import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy.service';
import {
    MopidyTracklistAddParams,
    MopidyTracklistFilterParams,
    MopidyTracklistIndexParams, MopidyTracklistOptionsParams,
    TlTrack,
    Track
} from '../../shared/types/mopidy';
import { ApplicationState } from '../application/application.state';
import * as TracklistActions from './tracklist.actions';
import { TracklistActionTypes } from './tracklist.actions';
import * as fromTracklistReducer from './tracklist.reducer';
import { RepeatState, ShuffleState } from './tracklist.state';

@Injectable()
export class TracklistEffects {

    @Effect()
    readonly getTlTracks$ = this.actions.pipe(
        ofType(TracklistActionTypes.GET_TL_TRACKS),
        switchMap(() => from(this.mopidy.tracklist().getTlTracks())),
        map((tlTracks: TlTrack[]) => new TracklistActions.GetTlTracksSuccess(tlTracks)),
    );

    @Effect({ dispatch: false })
    readonly queueNow$ = this.actions.pipe(
        ofType(TracklistActionTypes.QUEUE_NOW),
        map(({ payload }: TracklistActions.QueueNow) => payload),
        map((tracks: Track[]) => tracks.map((track: Track) => track.uri)),
        switchMap((uris: string[]) => from(this.mopidy.tracklist().index({})).pipe(
            map((index: number) => ({ uris, at_position: ++index }))),
        ),
        switchMap((params: MopidyTracklistAddParams) => from(this.mopidy.tracklist().add(params))),
        tap((tlTracks: TlTrack[]) => this.mopidy.playback().play({tl_track: tlTracks[0]})),
    );

    @Effect()
    readonly queueNext$ = this.actions.pipe(
        ofType(TracklistActionTypes.QUEUE_NEXT),
        map(({ payload }: TracklistActions.QueueNext) => payload),
        map((tracks: Track[]) => tracks.map((track: Track) => track.uri)),
        switchMap((uris: string[]) => from(this.mopidy.tracklist().index({})).pipe(
            map((index: number) => new TracklistActions.Add({ uris, at_position: ++index }))),
        ),
    );

    @Effect()
    readonly queueLast$ = this.actions.pipe(
        ofType(TracklistActionTypes.QUEUE_LAST),
        map(({ payload }: TracklistActions.QueueLast) => payload),
        map((tracks: Track[]) => tracks.map((track: Track) => track.uri)),
        map((trackUris: string[]) => new TracklistActions.Add({ uris: trackUris })),
    );

    @Effect()
    readonly add$ = this.actions.pipe(
        ofType(TracklistActionTypes.ADD),
        map(({ payload }: TracklistActions.Add) => payload),
        switchMap((params: MopidyTracklistAddParams) => from(this.mopidy.tracklist().add(params))),
        map((tlTracks: TlTrack[]) => new TracklistActions.AddSuccess(tlTracks)),
    );

    @Effect()
    readonly remove$ = this.actions.pipe(
        ofType(TracklistActionTypes.REMOVE),
        map(({ payload }: TracklistActions.Remove) => payload),
        switchMap((params: MopidyTracklistFilterParams) => from(this.mopidy.tracklist().remove(params))),
        map((tlTracks: TlTrack[]) => new TracklistActions.RemoveSuccess(tlTracks)),
    );

    @Effect()
    readonly clear$ = this.actions.pipe(
        ofType(TracklistActionTypes.CLEAR),
        tap(() => this.mopidy.tracklist().clear()),
        mapTo(new TracklistActions.ClearSuccess()),
    );

    @Effect()
    readonly index$ = this.actions.pipe(
        ofType(TracklistActionTypes.INDEX),
        map(({ payload }: TracklistActions.Index) => payload),
        switchMap((params: MopidyTracklistIndexParams) => from(this.mopidy.tracklist().index(params))),
        map((index: number) => new TracklistActions.IndexSuccess(index)),
    );

    @Effect()
    readonly toggleConsume$ = this.actions.pipe(
        ofType(TracklistActionTypes.TOGGLE_CONSUME),
        switchMap(() => from(this.mopidy.tracklist().getConsume())),
        map((consumeMode: boolean) => new TracklistActions.SetConsume({value: !consumeMode})),
    );

    @Effect()
    readonly getConsume$ = this.actions.pipe(
        ofType(TracklistActionTypes.GET_CONSUME),
        switchMap(() => from(this.mopidy.tracklist().getConsume())),
        map((consumeMode: boolean) => new TracklistActions.GetConsumeSuccess(consumeMode)),
    );

    @Effect({ dispatch: false })
    readonly setConsume$ = this.actions.pipe(
        ofType(TracklistActionTypes.SET_CONSUME),
        map((action: TracklistActions.SetConsume) => action.payload),
        tap((params: MopidyTracklistOptionsParams) => this.mopidy.tracklist().setConsume(params)),
    );

    @Effect()
    readonly getRandom$ = this.actions.pipe(
        ofType(TracklistActionTypes.GET_RANDOM),
        switchMap(() => from(this.mopidy.tracklist().getRandom())),
        map((randomMode: boolean) => new TracklistActions.GetRandomSuccess(randomMode)),
    );

    @Effect({ dispatch: false })
    readonly setRandom$ = this.actions.pipe(
        ofType(TracklistActionTypes.SET_RANDOM),
        map((action: TracklistActions.SetRandom) => action.payload),
        tap((params: MopidyTracklistOptionsParams) => this.mopidy.tracklist().setRandom(params)),
    );

    @Effect()
    readonly getRepeat$ = this.actions.pipe(
        ofType(TracklistActionTypes.GET_REPEAT),
        switchMap(() => from(this.mopidy.tracklist().getRepeat())),
        map((repeatMode: boolean) => new TracklistActions.GetRepeatSuccess(repeatMode)),
    );

    @Effect({ dispatch: false })
    readonly setRepeat$ = this.actions.pipe(
        ofType(TracklistActionTypes.SET_REPEAT),
        map((action: TracklistActions.SetRepeat) => action.payload),
        tap((params: MopidyTracklistOptionsParams) => this.mopidy.tracklist().setRepeat(params)),
    );

    @Effect()
    readonly getSingle$ = this.actions.pipe(
        ofType(TracklistActionTypes.GET_SINGLE),
        switchMap(() => from(this.mopidy.tracklist().getSingle())),
        map((singleMode: boolean) => new TracklistActions.GetSingleSuccess(singleMode)),
    );

    @Effect({ dispatch: false })
    readonly setSingle$ = this.actions.pipe(
        ofType(TracklistActionTypes.SET_SINGLE),
        map((action: TracklistActions.SetSingle) => action.payload),
        tap((params: MopidyTracklistOptionsParams) => this.mopidy.tracklist().setSingle(params)),
    );

    @Effect()
    readonly toggleShuffle$ = this.actions.pipe(
        ofType(TracklistActionTypes.TOGGLE_SHUFFLE),
        withLatestFrom(this.store.select(fromTracklistReducer.selectShuffleState)),
        map(([, shuffleState]: [TracklistActions.ToggleShuffle, ShuffleState]) =>
            new TracklistActions.SetRandom({ value: shuffleState !== ShuffleState.ON }),
        ),
    );

    @Effect()
    readonly toggleRepeat$ = this.actions.pipe(
        ofType(TracklistActionTypes.TOGGLE_REPEAT),
        withLatestFrom(this.store.select(fromTracklistReducer.selectRepeatState)),
        mergeMap(([, repeatState]: [TracklistActions.ToggleShuffle, RepeatState]) => repeatState === RepeatState.OFF
            ? [
                new TracklistActions.SetRepeat({ value: true }),
                new TracklistActions.SetSingle({ value: true }),
            ]
            : repeatState === RepeatState.SINGLE
                ? [
                    new TracklistActions.SetRepeat({ value: true }),
                    new TracklistActions.SetSingle({ value: false }),
                ]
                : [
                    new TracklistActions.SetRepeat({ value: false }),
                    new TracklistActions.SetSingle({ value: false }),
                ],
        ),
    );

    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private mopidy: MopidyService) {
    }
}
