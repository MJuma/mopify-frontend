import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { CommonPipesModule } from '../../../../../shared/pipes/common-pipes.module';

import { SongsComponent } from './songs.component';
import { TracksTableComponent } from './components/tracks-table/tracks-table.component';

@NgModule({
    declarations: [
        SongsComponent,
        TracksTableComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        CommonPipesModule,
    ]
})
export class SongsModule {
}
