import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule
} from '@angular/material';
import { CommonPipesModule } from '../../../../../shared/pipes/common-pipes.module';
import { SongsComponent } from './songs.component';
import { TracksTableComponent } from './components/tracks-table/tracks-table.component';

@NgModule({
    declarations: [
        SongsComponent,
        TracksTableComponent,
    ],
    imports: [
        CommonModule,
        CommonPipesModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatTableModule,
    ],
})
export class SongsModule {
}
