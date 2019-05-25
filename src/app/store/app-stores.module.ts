import { NgModule } from '@angular/core';
import { MopidyStoreModule } from './mopidy/mopidy-store.module';
import { PlayerStoreModule } from './player/player-store.module';
import { RouterStoreModule } from './router/router-store.module';
import { TracklistStoreModule } from './tracklist/tracklist-store.module';

@NgModule({
    imports: [
        MopidyStoreModule,
        PlayerStoreModule,
        RouterStoreModule,
        TracklistStoreModule,
    ],
})
export class AppStoresModule {
}
