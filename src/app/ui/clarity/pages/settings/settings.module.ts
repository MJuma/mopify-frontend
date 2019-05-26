import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsFormComponent,
    ],
    imports: [
        ClarityModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SettingsRoutingModule,
    ],
})
export class SettingsModule {
}
