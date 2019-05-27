import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TlTrack } from '../../../../../../shared/types/mopidy';

@Component({
    selector: 'app-now-playing-table',
    templateUrl: './now-playing-table.component.html',
    styleUrls: ['./now-playing-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowPlayingTableComponent {
    selectedTracks: TlTrack[] = [];

    @Input() tlTracks: TlTrack[];
    @Input() index: number;

    @Output() playTrack = new EventEmitter<TlTrack>();
    @Output() removeTracks = new EventEmitter<TlTrack[]>();
}
