import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Artist } from '../../../../../../shared/types/mopidy';
import { ImageUris } from '../../../../../../store/library/library.state';

@Component({
    selector: 'app-artists-results',
    templateUrl: './artists-results.component.html',
    styleUrls: ['./artists-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistsResultsComponent {
    @Input() artists: Artist[];
    @Input() imageUris: ImageUris;
}
