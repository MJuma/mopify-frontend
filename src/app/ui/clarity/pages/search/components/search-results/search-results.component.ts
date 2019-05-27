import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SearchResult } from '../../../../../../shared/types/mopidy';
import { ImageUris } from '../../../../../../store/library/library.state';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {
    @Input() searchResults: SearchResult;
    @Input() imageUris: ImageUris;
}
