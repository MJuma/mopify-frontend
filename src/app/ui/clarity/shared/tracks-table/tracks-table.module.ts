import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { CommonPipesModule } from '../../../../shared/pipes/common-pipes.module';
import { TracksTableComponent } from './tracks-table.component';

@NgModule({
    declarations: [
        TracksTableComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        CommonPipesModule,
    ],
    exports: [
        TracksTableComponent,
    ],
})
export class TracksTableModule {
}
