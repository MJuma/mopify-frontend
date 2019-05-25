import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy/mopidy.service';
import { PlaybackState, TlTrack } from '../../shared/types/mopidy';
import { PlayerActionsUnion, PlayerActionTypes } from './player.actions';
import * as PlayerActions from './player.actions';

@Injectable()
export class PlayerEffects {

    @Effect()
    readonly togglePlayPause$ = this.actions$.pipe(
        ofType(PlayerActionTypes.TOGGLE_PLAY_PAUSE),
        switchMap(() => this.mopidy.playbackGetState()),
        switchMap<PlaybackState, PlayerActionsUnion>((playbackState: PlaybackState) => {
            switch (playbackState) {
                case 'playing':
                    return of(new PlayerActions.Pause());
                case 'paused':
                    return of(new PlayerActions.Resume());
                case 'stopped':
                default:
                    return this.mopidy.playbackGetCurrentTlTrack().pipe(
                        map((currentTlTrack: TlTrack | undefined) => new PlayerActions.Play({tl_track: currentTlTrack})),
                    );
            }
        }),
    );

    @Effect({ dispatch: false })
    readonly play$ = this.actions$.pipe(
        ofType(PlayerActionTypes.PLAY),
        tap(({ payload }: PlayerActions.Play) => this.mopidy.playbackPlay(payload)),
    );

    @Effect({ dispatch: false })
    readonly pause$ = this.actions$.pipe(
        ofType(PlayerActionTypes.PAUSE),
        tap(() => this.mopidy.playbackPause()),
    );

    @Effect({ dispatch: false })
    readonly resume$ = this.actions$.pipe(
        ofType(PlayerActionTypes.RESUME),
        tap(() => this.mopidy.playbackResume()),
    );

    @Effect({ dispatch: false })
    readonly forward$ = this.actions$.pipe(
        ofType(PlayerActionTypes.FORWARD),
        tap(() => this.mopidy.playbackNext()),
    );

    @Effect({ dispatch: false })
    readonly back$ = this.actions$.pipe(
        ofType(PlayerActionTypes.BACK),
        tap(() => this.mopidy.playbackPrevious()),
    );

    @Effect({ dispatch: false })
    readonly stop$ = this.actions$.pipe(
        ofType(PlayerActionTypes.STOP),
        tap(() => this.mopidy.playbackStop()),
    );

    constructor(private actions$: Actions,
                private mopidy: MopidyService) {
    }
}
