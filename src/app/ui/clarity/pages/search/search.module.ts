import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CommonPipesModule } from '../../../../shared/pipes/common-pipes.module';
import { TracksTableModule } from '../../shared/tracks-table/tracks-table.module';
import { SearchComponent } from './search.component';
import { AdvancedSearchFormComponent } from './components/advanced-search-form/advanced-search-form.component';
import { BasicSearchFormComponent } from './components/basic-search-form/basic-search-form.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ArtistsResultsComponent } from './components/artists-results/artists-results.component';

@NgModule({
    declarations: [
        AdvancedSearchFormComponent,
        BasicSearchFormComponent,
        SearchComponent,
        SearchResultsComponent,
        ArtistsResultsComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        CommonPipesModule,
        FormsModule,
        ReactiveFormsModule,
        TracksTableModule,
    ]
})
export class SearchModule {
}
