import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
