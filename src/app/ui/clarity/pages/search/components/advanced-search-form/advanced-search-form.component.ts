import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MopidyLibrarySearchParams, Ref, SEARCH_FIELDS, SearchField, SearchQuery } from '../../../../../../shared/types/mopidy';

@Component({
    selector: 'app-advanced-search-form',
    templateUrl: './advanced-search-form.component.html',
    styleUrls: ['./advanced-search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchFormComponent {
    public searchQueriesForm: FormArray = new FormArray([this.addSearchQueryRow()]);
    public searchForm: FormGroup = new FormGroup({
        backend: new FormControl(''),
        queries: this.searchQueriesForm,
        exact: new FormControl(false),
    });
    public searchFields: string[] = SEARCH_FIELDS;

    @Input() rootDirectories: Ref[];

    @Output() submitSearch = new EventEmitter<MopidyLibrarySearchParams>();

    public search(formValue: AdvancedSearchForm): void {
        this.submitSearch.emit({
            query: formValue.queries.reduce(
                (acc: SearchQuery, curr: { field: string, query: string }) => ({
                    ...acc,
                    // @ts-ignore
                    [curr.field]: acc[curr.field as SearchField] ? [...acc[curr.field as SearchField], curr.query] : [curr.query],
                }),
                {} as SearchQuery,
            ),
            uris: formValue.backend ? [formValue.backend] : [],
            exact: formValue.exact,
        });
    }

    public createSearchQueryRow(): void {
        this.searchQueriesForm.push(this.addSearchQueryRow());
    }

    public removeSearchQueryRow(index: number): void {
        this.searchQueriesForm.removeAt(index);
    }

    private addSearchQueryRow(): FormGroup {
        return new FormGroup({
            field: new FormControl('any', Validators.required),
            query: new FormControl('', Validators.required),
        });
    }
}

interface AdvancedSearchForm {
    backend: string;
    exact: boolean;
    queries: {
        field: string;
        query: string;
    }[];
}
