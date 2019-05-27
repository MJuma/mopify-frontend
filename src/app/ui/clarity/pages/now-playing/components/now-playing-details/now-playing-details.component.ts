import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Track } from '../../../../../../shared/types/mopidy';

@Component({
    selector: 'app-now-playing-details',
    templateUrl: './now-playing-details.component.html',
    styleUrls: ['./now-playing-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowPlayingDetailsComponent implements OnInit {
    @Input() currentTrack: Track;
    @Input() imageUri: string;

    constructor() {
    }

    ngOnInit() {
    }

}
