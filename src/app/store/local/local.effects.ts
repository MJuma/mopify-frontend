import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy/mopidy.service';
import { MopidyLibraryGetImagesParams, MopidyLibraryGetImagesResponse, Ref, SearchResult, Track } from '../../shared/types/mopidy';
import { LocalActionTypes } from './local.actions';
import * as LocalActions from './local.actions';

@Injectable()
export class LocalEffects {

    @Effect()
    readonly getRootDirectories$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_ROOT_DIRECTORIES),
        switchMap(() => from(this.mopidy.library().browse({ uri: null }))),
        mergeMap((rootDirectories: Ref[]) => rootDirectories.find((directory: Ref) => directory.uri === 'local:directory')
            ? [
                new LocalActions.GetRootDirectoriesSuccess(rootDirectories),
                new LocalActions.GetArtists('local:directory'),
            ]
            : [
                new LocalActions.GetRootDirectoriesSuccess(rootDirectories),
            ],
        ),
    );

    @Effect()
    readonly getArtists$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_ARTISTS),
        map((action: LocalActions.GetArtists) => action.payload),
        switchMap((uri: string) => from(this.mopidy.library().browse({ uri }))),
        map((artists: Ref[]) => new LocalActions.GetArtistsSuccess(artists)),
    );

    @Effect()
    readonly getAlbums$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_ALBUMS),
        map((action: LocalActions.GetArtists) => action.payload),
        switchMap((uri: string) => from(this.mopidy.library().browse({ uri }))),
        map((artists: Ref[]) => new LocalActions.GetAlbumsSuccess(artists)),
    );

    @Effect()
    readonly getTracks$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_TRACKS),
        map((action: LocalActions.GetTracks) => action.payload),
        switchMap((uri: string) => from(this.mopidy.library().browse({ uri }))),
        map((trackRefs: Ref[]) => trackRefs.map((trackRef: Ref) => trackRef.uri)),
        map((trackUris: string[]) => trackUris.map((uri: string) => from(this.mopidy.library().search({ query: { uri } })))),
        concatMap((searchCalls: Observable<SearchResult[]>[]) => forkJoin(...searchCalls)),
        map((allTracksResults: SearchResult[][]) =>
            allTracksResults.map(singleTracksResults =>
                singleTracksResults.filter(results => !!results.tracks)),
        ),
        map((allTracksResults: SearchResult[][]) => allTracksResults.map(singleTracksResults => singleTracksResults[0])),
        map((trackResults: SearchResult[]) => trackResults.map((result: SearchResult) => result.tracks)),
        map((tracksLists: Track[][]) => [].concat.apply([], tracksLists as any)),
        map((tracks: Track[]) => new LocalActions.GetTracksSuccess(tracks)),
    );

    @Effect({ dispatch: false })
    readonly getDirectory$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_DIRECTORY),
        map((action: LocalActions.GetDirectory) => action.payload),
        mergeMap((uri: string) => from(from(this.mopidy.library().browse({ uri }))), 1),
        tap(x => console.log(x)),
        /*map((directories: Ref[]) => directories.map((directory: Ref) => {
            switch (directory.type) {
                case 'directory':
                    return new LocalActions.GetDirectory(directory.uri);
                case 'track':
                    return new LocalActions.SearchLibrary({query: {uri: directory.uri}});
                default:
                    return {type: 'noOp', payload: directory};
            }
        })),
        mergeMap((actions$: Action[]) => actions$),*/
    );

    @Effect()
    readonly getImages$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_IMAGES),
        map(({ payload }: LocalActions.GetImages) => payload),
        switchMap((params: MopidyLibraryGetImagesParams) => from(this.mopidy.library().getImages(params))),
        map((response: MopidyLibraryGetImagesResponse) => new LocalActions.GetImagesSuccess(response)),
    );

    constructor(private actions$: Actions,
                private mopidy: MopidyService) {
    }
}
