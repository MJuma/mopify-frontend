import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy.service';
import {
    MopidyLibraryBrowseRefreshParams,
    MopidyLibraryGetImagesParams,
    MopidyLibraryGetImagesResponse, MopidyLibrarySearchParams,
    Ref,
    SearchResult,
    Track,
} from '../../shared/types/mopidy';
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
    readonly getLocalArtists$ = this.actions$.pipe(
        ofType(LibraryActionTypes.GET_LOCAL_ARTISTS),
        withLatestFrom(this.store.select(fromLibraryReducer.selectLibraryState)),
        map(([, state]: [LibraryActions.BrowseLocal, LibraryState]) => state.localDirectoryUri),
        switchMap((uri: string) => from(this.mopidy.library().browse({uri}))),
        map((rootDirectories: Ref[]) => new LibraryActions.GetLocalArtistsSuccess(rootDirectories)),
    );

    @Effect()
    readonly getLocalAlbums$ = this.actions$.pipe(
        ofType(LibraryActionTypes.GET_LOCAL_ALBUMS),
        map((action: LibraryActions.GetLocalAlbums) => action.payload),
        switchMap((uri: string) => from(this.mopidy.library().browse({ uri }))),
        map((albums: Ref[]) => new LibraryActions.GetLocalAlbumsSuccess(albums)),
    );

    @Effect()
    readonly getLocalTracks$ = this.actions$.pipe(
        ofType(LibraryActionTypes.GET_LOCAL_TRACKS),
        map((action: LibraryActions.GetLocalTracks) => action.payload),
        switchMap((uri: string) => from(this.mopidy.library().browse({ uri }))),
        map((trackRefs: Ref[]) => trackRefs.map((trackRef: Ref) => trackRef.uri)),
        withLatestFrom(this.store.select(fromLibraryReducer.selectLibraryState)),
        map(([uris, state]: [string[], LibraryState]) => uris.map((uri) => ({ query: { uri: [uri] }, uris: [state.localDirectoryUri] }))),
        map((params: MopidyLibrarySearchParams[]) => params.map((param) => from(this.mopidy.library().search(param)))),
        concatMap((searchCalls: Observable<SearchResult[]>[]) => forkJoin(...searchCalls)),
        map((allTracksResults: SearchResult[][]) =>
            allTracksResults.map(singleTracksResults =>
                singleTracksResults.filter(results => !!results.tracks)),
        ),
        map((allTracksResults: SearchResult[][]) => allTracksResults.map(singleTracksResults => singleTracksResults[0])),
        map((trackResults: SearchResult[]) => trackResults.map((result: SearchResult) => result.tracks)),
        map((tracksLists: Track[][]) => ([] as Track[]).concat.apply([], tracksLists)),
        map((tracks: Track[]) => new LibraryActions.GetLocalTracksSuccess(tracks)),
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

    @Effect()
    readonly getImages$ = this.actions$.pipe(
        ofType(LibraryActionTypes.GET_IMAGES),
        map(({ payload }: LibraryActions.GetImages) => payload),
        switchMap((params: MopidyLibraryGetImagesParams) => from(this.mopidy.library().getImages(params))),
        map((response: MopidyLibraryGetImagesResponse) => new LibraryActions.GetImagesSuccess(response)),
    );

    constructor(private actions$: Actions,
                private store: Store<ApplicationState>,
                private mopidy: MopidyService) {
    }
}
