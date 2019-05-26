import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ref } from '../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../store/application/application.state';
import * as fromLibraryState from '../../../../store/library/library.reducer';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
    public rootDirectories$: Observable<Ref[]>;
    public localDirectoryExists$: Observable<boolean>;
    public spotifyWebDirectoryExists$: Observable<boolean>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.rootDirectories$ = this.store.select(fromLibraryState.selectRootDirectories);
        this.localDirectoryExists$ = this.store.select(fromLibraryState.selectLocalDirectoryExists);
        this.spotifyWebDirectoryExists$ = this.store.select(fromLibraryState.selectSpotifyWebDirectoryExists);
    }
}
