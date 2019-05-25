import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ref, Track } from '../../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../../store/application/application.state';
import * as LocalActions from '../../../../../store/local/local.actions';
import * as fromLocalReducer from '../../../../../store/local/local.reducer';
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
        this.artists$ = this.store.select(fromLocalReducer.selectArtists);
        this.albums$ = this.store.select(fromLocalReducer.selectAlbums);
        this.tracks$ = this.store.select(fromLocalReducer.selectTracks);

        this.store.dispatch(new LocalActions.GetRootDirectories());
    }

    public getAlbums(uri: string): void {
        this.store.dispatch(new LocalActions.GetAlbums(uri));
    }

    public getTracks(uri: string): void {
        this.store.dispatch(new LocalActions.GetTracks(uri));
    }

    public playTrack(uri: string): void {
        this.store.dispatch(new LocalActions.PlayTrack(uri));
    }

    public queueNext(tracks: Track[]): void {
        this.store.dispatch(new TracklistActions.QueueNext(tracks));
    }

    public queueLast(tracks: Track[]): void {
        this.store.dispatch(new TracklistActions.QueueLast(tracks));
    }
}
