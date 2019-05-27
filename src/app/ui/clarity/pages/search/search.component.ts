import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MopidyLibrarySearchParams, Ref, SearchResult } from '../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../store/application/application.state';
import * as fromLibraryReducer from '../../../../store/library/library.reducer';
import * as LibraryActions from '../../../../store/library/library.actions';
import { ImageUris } from '../../../../store/library/library.state';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
    public rootDirectories$: Observable<Ref[]>;
    public searchResults$: Observable<SearchResult | undefined>;
    public images$: Observable<ImageUris>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.rootDirectories$ = this.store.select(fromLibraryReducer.selectRootDirectories);
        this.searchResults$ = this.store.select(fromLibraryReducer.selectSearchResults);
        this.images$ = this.store.select(fromLibraryReducer.selectImages);
    }

    public search(params: MopidyLibrarySearchParams): void {
        this.store.dispatch(new LibraryActions.Search(params));
    }
}
