import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { CommonPipesModule } from '../../../../shared/pipes/common-pipes.module';
import { NowPlayingComponent } from './now-playing.component';
import { NowPlayingTableComponent } from './components/now-playing-table/now-playing-table.component';
import { NowPlayingDetailsComponent } from './components/now-playing-details/now-playing-details.component';

@NgModule({
    declarations: [
        NowPlayingComponent,
        NowPlayingTableComponent,
        NowPlayingDetailsComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        CommonPipesModule,
    ]
})
export class NowPlayingModule {
}
