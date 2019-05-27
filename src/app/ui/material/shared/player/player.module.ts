import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatSliderModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { CommonPipesModule } from '../../../../shared/pipes/common-pipes.module';
import { PlayerComponent } from './player.component';

@NgModule({
    declarations: [
        PlayerComponent,
    ],
    exports: [
        PlayerComponent,
    ],
    imports: [
        CommonModule,
        CommonPipesModule,
        MatButtonModule,
        MatIconModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatToolbarModule,
    ],
})
export class PlayerModule {
}
