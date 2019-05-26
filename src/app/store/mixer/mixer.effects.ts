import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy/mopidy.service';
import { MopidyMixerSetMuteParams, MopidyMixerSetVolumeParams } from '../../shared/types/mopidy';
import { MixerActionTypes } from './mixer.actions';
import * as MixerActions from './mixer.actions';

@Injectable()
export class MixerEffects {

    @Effect()
    readonly getMute$ = this.actions$.pipe(
        ofType(MixerActionTypes.GET_MUTE),
        switchMap(() => from(this.mopidy.mixer().getMute())),
        map((muteState: boolean | undefined) => new MixerActions.GetMuteSuccess(muteState)),
    );

    @Effect()
    readonly setMute$ = this.actions$.pipe(
        ofType(MixerActionTypes.SET_MUTE),
        map(({ payload }: MixerActions.SetMute) => payload),
        switchMap((params: MopidyMixerSetMuteParams) => from(this.mopidy.mixer().setMute(params))),
        map((muteChanged: boolean) => new MixerActions.SetMuteSuccess(muteChanged)),
    );

    @Effect()
    readonly getVolume$ = this.actions$.pipe(
        ofType(MixerActionTypes.GET_VOLUME),
        switchMap(() => from(this.mopidy.mixer().getVolume())),
        map((volume: number | undefined) => new MixerActions.GetVolumeSuccess(volume)),
    );

    @Effect()
    readonly setVolume$ = this.actions$.pipe(
        ofType(MixerActionTypes.SET_VOLUME),
        map(({ payload }: MixerActions.SetVolume) => payload),
        switchMap((params: MopidyMixerSetVolumeParams) => from(this.mopidy.mixer().setVolume(params))),
        map((volumeChanged: boolean) => new MixerActions.SetVolumeSuccess(volumeChanged)),
    );

    constructor(private actions$: Actions,
                private mopidy: MopidyService) {}
}
