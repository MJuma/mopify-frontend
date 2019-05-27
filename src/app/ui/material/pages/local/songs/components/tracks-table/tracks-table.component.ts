import { SelectionModel } from '@angular/cdk/collections';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../../../../../../../shared/types/mopidy';

@Component({
    selector: 'app-tracks-table',
    templateUrl: './tracks-table.component.html',
    styleUrls: ['./tracks-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksTableComponent {
    selectedTracks = new SelectionModel<Track>(true, []);
    displayedColumns: string[] = ['select', 'track_no', 'name', 'length', 'genre', 'date'];

    @Input() tracks: Track[];

    @Output() queueNow = new EventEmitter<Track[]>();
    @Output() queueNext = new EventEmitter<Track[]>();
    @Output() queueLast = new EventEmitter<Track[]>();

    toggleAllTracksSelection() {
        this.selectedTracks.selected.length === this.tracks.length
            ? this.selectedTracks.clear()
            : this.tracks.forEach(row => this.selectedTracks.select(row));
    }
}
