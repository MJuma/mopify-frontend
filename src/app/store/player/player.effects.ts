import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, of, timer } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy/mopidy.service';
import { MopidyPlaybackSeekParams, PlaybackState, TlTrack, Track } from '../../shared/types/mopidy';
import { PlayerActionsUnion, PlayerActionTypes } from './player.actions';
import * as PlayerActions from './player.actions';

@Injectable()
export class PlayerEffects {

    @Effect()
    readonly getCurrentTrack$ = this.actions$.pipe(
        ofType(PlayerActionTypes.GET_CURRENT_TRACK),
        switchMap(() => from(this.mopidy.playback().getCurrentTrack())),
        map((currentTrack: Track | undefined) => new PlayerActions.GetCurrentTrackSuccess(currentTrack)),
    );

    @Effect()
    readonly getStreamTitle$ = this.actions$.pipe(
        ofType(PlayerActionTypes.GET_STREAM_TITLE),
        switchMap(() => from(this.mopidy.playback().getStreamTitle())),
        map((streamTitle: string | undefined) => new PlayerActions.GetStreamTitleSuccess(streamTitle))
    );

    @Effect()
    readonly getTimePosition$ = this.actions$.pipe(
        ofType(PlayerActionTypes.GET_TIME_POSITION),
        switchMap(() => from(this.mopidy.playback().getTimePosition())),
        map((timePosition: number | undefined) => new PlayerActions.GetTimePositionSuccess(timePosition))
    );

    @Effect()
    readonly pollTimePosition$ = this.actions$.pipe(
        ofType(PlayerActionTypes.GET_PLAYBACK_STATE_SUCCESS),
        map(({ payload }: PlayerActions.GetPlaybackStateSuccess) => payload),
        filter((playbackState: PlaybackState) => playbackState === 'playing'),
        switchMap(() => timer(0, 250).pipe(
            takeUntil(this.actions$.pipe(
                ofType(PlayerActionTypes.GET_PLAYBACK_STATE_SUCCESS),
                map(({ payload }: PlayerActions.GetPlaybackStateSuccess) => payload),
                filter((playbackState: PlaybackState) => playbackState !== 'playing'),
            )),
            switchMap(() => from(this.mopidy.playback().getTimePosition())),
            map((timePosition: number | undefined) => new PlayerActions.GetTimePositionSuccess(timePosition)),
        )),
    );

    @Effect()
    readonly getPlaybackState$ = this.actions$.pipe(
        ofType(PlayerActionTypes.GET_PLAYBACK_STATE),
        switchMap(() => from(this.mopidy.playback().getState())),
        map((playbackState: PlaybackState) => new PlayerActions.GetPlaybackStateSuccess(playbackState))
    );

    @Effect()
    readonly togglePlayPause$ = this.actions$.pipe(
        ofType(PlayerActionTypes.TOGGLE_PLAY_PAUSE),
        switchMap(() => from(this.mopidy.playback().getState())),
        switchMap<PlaybackState, PlayerActionsUnion>((playbackState: PlaybackState) => {
            switch (playbackState) {
                case 'playing':
                    return of(new PlayerActions.Pause());
                case 'paused':
                    return of(new PlayerActions.Resume());
                case 'stopped':
                default:
                    return from(this.mopidy.playback().getCurrentTlTrack()).pipe(
                        map((currentTlTrack: TlTrack | undefined) => new PlayerActions.Play({tl_track: currentTlTrack})),
                    );
            }
        }),
    );

    @Effect({ dispatch: false })
    readonly play$ = this.actions$.pipe(
        ofType(PlayerActionTypes.PLAY),
        tap(({ payload }: PlayerActions.Play) => this.mopidy.playback().play(payload)),
    );

    @Effect({ dispatch: false })
    readonly pause$ = this.actions$.pipe(
        ofType(PlayerActionTypes.PAUSE),
        tap(() => this.mopidy.playback().pause()),
    );

    @Effect({ dispatch: false })
    readonly resume$ = this.actions$.pipe(
        ofType(PlayerActionTypes.RESUME),
        tap(() => this.mopidy.playback().resume()),
    );

    @Effect({ dispatch: false })
    readonly forward$ = this.actions$.pipe(
        ofType(PlayerActionTypes.FORWARD),
        tap(() => this.mopidy.playback().next()),
    );

    @Effect({ dispatch: false })
    readonly back$ = this.actions$.pipe(
        ofType(PlayerActionTypes.BACK),
        tap(() => this.mopidy.playback().previous()),
    );

    @Effect({ dispatch: false })
    readonly stop$ = this.actions$.pipe(
        ofType(PlayerActionTypes.STOP),
        tap(() => this.mopidy.playback().stop()),
    );

    @Effect()
    readonly seek$ = this.actions$.pipe(
        ofType(PlayerActionTypes.SEEK),
        map(({ payload }: PlayerActions.Seek) => payload),
        switchMap((params: MopidyPlaybackSeekParams) => from(this.mopidy.playback().seek(params))),
        map((seekSuccess: boolean) => new PlayerActions.SeekSuccess(seekSuccess)),
    );

    constructor(private actions$: Actions,
                private mopidy: MopidyService) {
    }
}
