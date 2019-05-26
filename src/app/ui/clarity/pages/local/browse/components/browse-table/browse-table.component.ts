import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Ref, Types } from '../../../../../../../shared/types/mopidy';

@Component({
  selector: 'app-browse-table',
  templateUrl: './browse-table.component.html',
  styleUrls: ['./browse-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseTableComponent {
    public types: typeof Types = Types;

    @Input() currentDirectories: Ref[];
    @Input() previousDirectoryUris: string[];

    @Output() browseDirectory = new EventEmitter<string>();
    @Output() browseBack = new EventEmitter<string>();
    @Output() playTrack = new EventEmitter<string>();
    @Output() queueAll = new EventEmitter<Ref[]>();
}
