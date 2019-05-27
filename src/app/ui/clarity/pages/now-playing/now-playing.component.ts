import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TlTrack, Track } from '../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../store/application/application.state';
import * as fromLibraryReducer from '../../../../store/library/library.reducer';
import { ImageUris } from '../../../../store/library/library.state';
import * as PlayerActions from '../../../../store/player/player.actions';
import * as fromPlayerReducer from '../../../../store/player/player.reducer';
import * as TracklistActions from '../../../../store/tracklist/tracklist.actions';
import * as fromTracklistReducer from '../../../../store/tracklist/tracklist.reducer';

@Component({
    selector: 'app-now-playing',
    templateUrl: './now-playing.component.html',
    styleUrls: ['./now-playing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowPlayingComponent implements OnInit {
    public tlTracks$: Observable<TlTrack[]>;
    public index$: Observable<number | undefined>;
    public images$: Observable<ImageUris>;
    public currentTrack$: Observable<Track | undefined>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.tlTracks$ = this.store.select(fromTracklistReducer.selectTlTracks);
        this.index$ = this.store.select(fromTracklistReducer.selectIndex);
        this.images$ = this.store.select(fromLibraryReducer.selectImages);
        this.currentTrack$ = this.store.select(fromPlayerReducer.selectCurrentTrack);
    }

    public removeTracks(tlTracks: TlTrack[]): void {
        this.store.dispatch(new TracklistActions.Remove({tlid: tlTracks.map(track => track.tlid)}));
    }

    public playTrack(tlTrack: TlTrack): void {
        this.store.dispatch(new PlayerActions.Play({tl_track: tlTrack}));
    }
}
