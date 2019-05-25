import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MopidyService } from '../../shared/services/mopidy/mopidy.service';
import { Ref, SearchResult, TlTrack, Track } from '../../shared/types/mopidy';
import { LocalActionTypes } from './local.actions';
import * as LocalActions from './local.actions';

@Injectable()
export class LocalEffects {

    @Effect()
    readonly getRootDirectories$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_ROOT_DIRECTORIES),
        switchMap(() => from(this.mopidy.libraryBrowse({ uri: null }))),
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
        switchMap((uri: string) => this.mopidy.libraryBrowse({ uri })),
        map((artists: Ref[]) => new LocalActions.GetArtistsSuccess(artists)),
    );

    @Effect()
    readonly getAlbums$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_ALBUMS),
        map((action: LocalActions.GetArtists) => action.payload),
        switchMap((uri: string) => this.mopidy.libraryBrowse({ uri })),
        map((artists: Ref[]) => new LocalActions.GetAlbumsSuccess(artists)),
    );

    @Effect()
    readonly getTracks$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_TRACKS),
        map((action: LocalActions.GetTracks) => action.payload),
        switchMap((uri: string) => this.mopidy.libraryBrowse({ uri })),
        map((trackRefs: Ref[]) => trackRefs.map((trackRef: Ref) => trackRef.uri)),
        map((trackUris: string[]) => trackUris.map((uri: string) => this.mopidy.librarySearch({ query: { uri } }))),
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
    readonly playTrack$ = this.actions$.pipe(
        ofType(LocalActionTypes.PLAY_TRACK),
        map((action: LocalActions.PlayTrack) => action.payload),
        switchMap((uri: string) => this.mopidy.tracklistAdd({ uri })),
        tap((tlTracks: TlTrack[]) => this.mopidy.playbackPlay({ tl_track: tlTracks[0] })),
    );

    /*@Effect()
    readonly getRootDirectoriesSuccess$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_ROOT_DIRECTORIES_SUCCESS),
        map((action: LocalActions.GetRootDirectoriesSuccess) => action.payload),
        filter((rootDirectories: MopidyDirectoriesMap) => !!rootDirectories['local:directory']),
        mapTo('local:directory:U2/No%20Line%20On%20The%20Horizon'),
        map((uri: string) => new LocalActions.GetDirectory(uri)),
    );*/

    @Effect({ dispatch: false })
    readonly getDirectory$ = this.actions$.pipe(
        ofType(LocalActionTypes.GET_DIRECTORY),
        map((action: LocalActions.GetDirectory) => action.payload),
        mergeMap((uri: string) => from(this.mopidy.libraryBrowse({ uri })), 1),
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

    /*@Effect()
    readonly searchLibrary$ = this.actions$.pipe(
        ofType(LocalActionTypes.SEARCH_LIBRARY),
        map((action: LocalActions.SearchLibrary) => action.payload),
        mergeMap((params: MopidyLibrarySearchParams) => from(this.mopidy.librarySearch(params))),
        map((results: SearchResult[]) => results.map((result: SearchResult) => result.tracks)),
        map((tracksLists: Track[][]) => tracksLists[0]),
        map((tracks: Track[]) => tracks[0]),
        map((track: Track) => new LocalActions.AddTrack(track)),
        // map((tacksLists: any) => [].concat.apply([], tacksLists),
        // map((tracks: Track[]) => tracks.map((track: Track) => new LocalActions.AddTrack(track)))),
        // mergeMap((actions$: Action[]) => actions$),
    );*/

    constructor(private actions$: Actions,
                private mopidy: MopidyService) {
    }
}
