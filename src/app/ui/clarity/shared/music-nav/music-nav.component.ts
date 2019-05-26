import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../../../store/application/application.state';
import { TlTrack, Track } from '../../../../shared/types/mopidy';
import { ImageUris } from '../../../../store/local/local.state';
import { LyricsCache } from '../../../../store/lyrics/lyrics.state';
import * as fromTracklistReducer from '../../../../store/tracklist/tracklist.reducer';
import * as TracklistActions from '../../../../store/tracklist/tracklist.actions';
import * as PlayerActions from '../../../../store/player/player.actions';
import * as fromLocalReducer from '../../../../store/local/local.reducer';
import * as fromPlayerReducer from '../../../../store/player/player.reducer';
import * as fromLyricsReducer from '../../../../store/lyrics/lyrics.reducer';

@Component({
    selector: 'app-music-nav',
    templateUrl: './music-nav.component.html',
    styleUrls: ['./music-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicNavComponent implements OnInit {
    public tlTracks$: Observable<TlTrack[]>;
    public index$: Observable<number | undefined>;
    public images$: Observable<ImageUris>;
    public currentTrack$: Observable<Track | undefined>;
    public lyrics$: Observable<LyricsCache>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.tlTracks$ = this.store.select(fromTracklistReducer.selectTlTracks);
        this.index$ = this.store.select(fromTracklistReducer.selectIndex);
        this.images$ = this.store.select(fromLocalReducer.selectImages);
        this.currentTrack$ = this.store.select(fromPlayerReducer.selectCurrentTrack);
        this.lyrics$ = this.store.select(fromLyricsReducer.selectLyrics);
    }

    public removeTrack(tlTrack: TlTrack): void {
        this.store.dispatch(new TracklistActions.Remove({tlid: [tlTrack.tlid]}));
    }

    public clearTracks(): void {
        this.store.dispatch(new TracklistActions.Clear());
    }

    public playTrack(tlTrack: TlTrack): void {
        this.store.dispatch(new PlayerActions.Play({tl_track: tlTrack}));
    }
}
