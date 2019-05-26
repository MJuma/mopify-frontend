import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ref, Track } from '../../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../../store/application/application.state';
import * as LibraryActions from '../../../../../store/library/library.actions';
import * as fromLibraryReducer from '../../../../../store/library/library.reducer';
import * as TracklistActions from '../../../../../store/tracklist/tracklist.actions';

@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsComponent implements OnInit {
    public artists$: Observable<Ref[]>;
    public albums$: Observable<Ref[]>;
    public tracks$: Observable<Track[]>;

    constructor(private store: Store<ApplicationState>) {}

    public ngOnInit(): void {
        this.artists$ = this.store.select(fromLibraryReducer.selectArtists);
        this.albums$ = this.store.select(fromLibraryReducer.selectAlbums);
        this.tracks$ = this.store.select(fromLibraryReducer.selectTracks);

        this.store.dispatch(new LibraryActions.GetLocalArtists());
    }

    public getAlbums(uri: string): void {
        this.store.dispatch(new LibraryActions.GetLocalAlbums(uri));
    }

    public getTracks(uri: string): void {
        this.store.dispatch(new LibraryActions.GetLocalTracks(uri));
    }

    public queueNow(tracks: Track[]): void {
        this.store.dispatch(new TracklistActions.QueueNow(tracks.map((track: Track) => track.uri)));
    }

    public queueNext(tracks: Track[]): void {
        this.store.dispatch(new TracklistActions.QueueNext(tracks));
    }

    public queueLast(tracks: Track[]): void {
        this.store.dispatch(new TracklistActions.QueueLast(tracks));
    }
}
