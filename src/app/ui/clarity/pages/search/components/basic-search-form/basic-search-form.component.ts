import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MopidyLibrarySearchParams } from '../../../../../../shared/types/mopidy';

@Component({
    selector: 'app-basic-search-form',
    templateUrl: './basic-search-form.component.html',
    styleUrls: ['./basic-search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSearchFormComponent {
    @Output() submitSearch = new EventEmitter<MopidyLibrarySearchParams>();

    public search(searchTerm: string): void {
        if (searchTerm) {
            this.submitSearch.emit({ query: { any: [searchTerm] } });
        }
    }
}
