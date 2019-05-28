import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { CommonPipesModule } from '../../../../../shared/pipes/common-pipes.module';
import { TracksTableComponent } from './components/tracks-table/tracks-table.component';

import { SongsComponent } from './songs.component';

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
