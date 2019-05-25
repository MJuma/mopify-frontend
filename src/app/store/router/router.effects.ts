/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterActionTypes } from './router.actions';

@Injectable()
export class RouterEffects {

    constructor(
        private actions: Actions,
        private router: Router,
        private location: Location,
    ) {
    }

    @Effect({ dispatch: false })
    readonly go$ = this.actions.pipe(
        ofType(RouterActionTypes.GO),
        map(({payload}) => payload),
        tap(({ path, query: queryParams, extras}) => this.router.navigate(path, { queryParams, ...extras as NavigationExtras })),
    );

    @Effect({ dispatch: false })
    readonly back$ = this.actions.pipe(
        ofType(RouterActionTypes.BACK),
        tap(() => this.location.back()),
    );

    @Effect({ dispatch: false })
    readonly forward$ = this.actions.pipe(
        ofType(RouterActionTypes.FORWARD),
        tap(() => this.location.forward()),
    );
}
