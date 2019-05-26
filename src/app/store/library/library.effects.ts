import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy.service';
import { MopidyLibraryBrowseRefreshParams, Ref } from '../../shared/types/mopidy';
import { ApplicationState } from '../application/application.state';
import { LibraryActionTypes } from './library.actions';
import * as LibraryActions from './library.actions';
import * as fromLibraryReducer from './library.reducer';
import { LibraryState } from './library.state';

@Injectable()
export class LibraryEffects {

    @Effect()
    readonly getRootDirectories$ = this.actions$.pipe(
        ofType(LibraryActionTypes.GET_ROOT_DIRECTORIES),
        switchMap(() => from(this.mopidy.library().browse({ uri: null }))),
        map((rootDirectories: Ref[]) => new LibraryActions.GetRootDirectoriesSuccess(rootDirectories)),
    );

    @Effect()
    readonly browseLocal$ = this.actions$.pipe(
        ofType(LibraryActionTypes.BROWSE_LOCAL),
        withLatestFrom(this.store.select(fromLibraryReducer.selectLibraryState)),
        map(([, state]: [LibraryActions.BrowseLocal, LibraryState]) => state.localDirectoryUri),
        map((libraryDirectoryUri: string) => new LibraryActions.Browse({ uri: libraryDirectoryUri })),
    );

    @Effect()
    readonly browse$ = this.actions$.pipe(
        ofType(LibraryActionTypes.BROWSE),
        map(({ payload }: LibraryActions.Browse) => payload),
        switchMap((params: MopidyLibraryBrowseRefreshParams) => from(this.mopidy.library().browse(params))),
        map((rootDirectories: Ref[]) => new LibraryActions.BrowseSuccess(rootDirectories)),
    );

    @Effect()
    readonly browseBack$ = this.actions$.pipe(
        ofType(LibraryActionTypes.BROWSE_BACK),
        map(({ payload }: LibraryActions.BrowseBack) => payload),
        switchMap((uri: string) => from(this.mopidy.library().browse({ uri }))),
        map((rootDirectories: Ref[]) => new LibraryActions.BrowseSuccess(rootDirectories)),
    );

    constructor(private actions$: Actions,
                private store: Store<ApplicationState>,
                private mopidy: MopidyService) {
    }
}
