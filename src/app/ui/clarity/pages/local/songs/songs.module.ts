import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { CommonPipesModule } from '../../../../../shared/pipes/common-pipes.module';
import { TracksTableModule } from '../../../shared/tracks-table/tracks-table.module';

import { SongsComponent } from './songs.component';

@NgModule({
    declarations: [
        SongsComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        CommonPipesModule,
        TracksTableModule,
    ]
})
export class SongsModule {
}
