import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ref } from '../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../store/application/application.state';
import * as fromLibraryState from '../../../../store/library/library.reducer';
import { NavItem } from './components/nav-item/nav-item.component';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
    topNavItems: NavItem[] = [
        { displayName: 'Home', route: '/', iconName: 'home' },
        { displayName: 'Now playing', route: '/queue', iconName: 'queue_music' },
        {
            displayName: 'Local',
            route: '/local',
            iconName: 'laptop',
            children: [
                { displayName: 'Songs', route: '/local/songs', iconName: 'music_note' },
                { displayName: 'Browse', route: '/local/browse', iconName: 'folder_open' },
                { displayName: 'Playlists', route: '/local/playlists', iconName: 'list' },
            ],
        },
        {
            displayName: 'Spotify',
            route: '/spotify',
            svgIconName: 'spotify',
            children: [
                { displayName: 'Dashboard', route: '/spotify/dadhboard', iconName: 'dashboard' },
                { displayName: 'Browse', route: '/spotify/browse', iconName: 'folder_open' },
                { displayName: 'Playlists', route: '/spotify/playlists', iconName: 'list' },
                { displayName: 'Discover', route: '/spotify/discover', iconName: 'track_changes' },
                { displayName: 'Radio', route: '/spotify/radio', iconName: 'radio' },
                { displayName: 'Stations', route: '/spotify/stations', iconName: 'wifi_tethering' },
            ],
        },
        { displayName: 'Search', route: '/search', iconName: 'search' },

    ];
    bottomNavItems: NavItem[] = [
        { displayName: 'Settings', route: '/settings', iconName: 'settings' },
    ];

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
