import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonPipesModule } from '../../../../shared/pipes/common-pipes.module';
import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        CommonPipesModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
    ],
})
export class SettingsModule {
}
