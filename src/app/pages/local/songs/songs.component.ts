import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsComponent implements OnInit {
    songs = [];

    constructor() {
    }

    ngOnInit() {
    }

}
