import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy.service';
import { MopidyActionTypes } from './mopidy.actions';
import * as MopidyActions from './mopidy.actions';

@Injectable()
export class MopidyEffects {

    @Effect({ dispatch: false })
    readonly connect$ = this.actions$.pipe(
        ofType(MopidyActionTypes.CONNECT),
        tap(() => this.mopidy.connect()),
    );

    @Effect({ dispatch: false })
    readonly disconnect$ = this.actions$.pipe(
        ofType(MopidyActionTypes.DISCONNECT),
        tap(() => this.mopidy.disconnect()),
    );

    @Effect()
    readonly getVersion$ = this.actions$.pipe(
        ofType(MopidyActionTypes.GET_VERSION),
        switchMap(() => from(this.mopidy.getVersion())),
        map((version: string) => new MopidyActions.GetVersionSuccess(version)),
    );

    @Effect()
    readonly getUriSchemes$ = this.actions$.pipe(
        ofType(MopidyActionTypes.GET_URI_SCHEMES),
        switchMap(() => from(this.mopidy.getUriSchemes())),
        map((uriSchemes: string[]) => new MopidyActions.GetUriSchemesSuccess(uriSchemes)),
    );

    constructor(private actions$: Actions,
                private mopidy: MopidyService) {
    }
}
