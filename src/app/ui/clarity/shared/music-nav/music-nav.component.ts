import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../../../store/application/application.state';
import { TlTrack } from '../../../../shared/types/mopidy';
import * as fromTracklistReducer from '../../../../store/tracklist/tracklist.reducer';

@Component({
    selector: 'app-music-nav',
    templateUrl: './music-nav.component.html',
    styleUrls: ['./music-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicNavComponent implements OnInit {
    public tlTracks$: Observable<TlTrack[]>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.tlTracks$ = this.store.select(fromTracklistReducer.selectTlTracks);
    }
}
