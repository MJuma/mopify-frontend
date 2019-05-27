import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkMaterialModule } from './bulk-material.module';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { HeaderModule } from './shared/header/header.module';
import { PlayerModule } from './shared/player/player.module';

@NgModule({
    declarations: [
        MaterialComponent,
    ],
    imports: [
        BulkMaterialModule,
        CommonModule,
        HeaderModule,
        PlayerModule,
        MaterialRoutingModule,
    ],
})
export class MaterialModule {
}
