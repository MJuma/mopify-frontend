import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../../../../shared/types/mopidy';

@Component({
    selector: 'app-tracks-table',
    templateUrl: './tracks-table.component.html',
    styleUrls: ['./tracks-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksTableComponent {
    selectedTracks: Track[] = [];

    @Input() tracks: Track[];
    @Input() footerMessage: string;
    @Input() paginate: boolean;

    @Output() queueNow = new EventEmitter<Track[]>();
    @Output() queueNext = new EventEmitter<Track[]>();
    @Output() queueLast = new EventEmitter<Track[]>();
}
