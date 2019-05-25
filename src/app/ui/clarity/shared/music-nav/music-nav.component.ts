import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../../../store/application/application.state';
import { TlTrack } from '../../../../shared/types/mopidy';
import * as fromTracklistReducer from '../../../../store/tracklist/tracklist.reducer';
import * as TracklistActions from '../../../../store/tracklist/tracklist.actions';
import * as PlayerActions from '../../../../store/player/player.actions';

@Component({
    selector: 'app-music-nav',
    templateUrl: './music-nav.component.html',
    styleUrls: ['./music-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicNavComponent implements OnInit {
    public tlTracks$: Observable<TlTrack[]>;
    public index$: Observable<number | undefined>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.tlTracks$ = this.store.select(fromTracklistReducer.selectTlTracks);
        this.index$ = this.store.select(fromTracklistReducer.selectIndex);
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
