import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { MaterialActionTypes } from './material.actions';
import * as MaterialActions from './material.actions';

@Injectable()
export class MaterialEffects {

    @Effect({ dispatch: false })
    readonly selectTheme$ = this.actions$.pipe(
        ofType(MaterialActionTypes.SET_THEME),
        map(({ payload }: MaterialActions.SetTheme) => payload),
        tap((theme: string) => {
            const classList = this.overlayContainer.getContainerElement().classList;
            const toRemove = Array.from(classList).filter((item: string) =>
                item.includes('-theme')
            );
            if (toRemove.length) {
                classList.remove(...toRemove);
            }
            classList.add(theme);
        })
    );

    constructor(private actions$: Actions,
                private overlayContainer: OverlayContainer) {
    }
}
