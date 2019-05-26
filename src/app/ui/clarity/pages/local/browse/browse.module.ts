import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { BrowseComponent } from './browse.component';
import { BrowseTableComponent } from './components/browse-table/browse-table.component';

@NgModule({
    declarations: [
        BrowseComponent,
        BrowseTableComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule
    ],
    exports: [
        BrowseComponent,
    ],
})
export class BrowseModule {
}
