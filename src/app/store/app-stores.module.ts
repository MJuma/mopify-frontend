import { NgModule } from '@angular/core';
import { LibraryStoreModule } from './library/library-store.module';
import { LyricsStoreModule } from './lyrics/lyrics-store.module';
import { MixerStoreModule } from './mixer/mixer-store.module';
import { MopidyEventStoreModule } from './mopidy-event/mopidy-event-store.module';
import { MopidyStoreModule } from './mopidy/mopidy-store.module';
import { PlayerStoreModule } from './player/player-store.module';
import { RouterStoreModule } from './router/router-store.module';
import { TracklistStoreModule } from './tracklist/tracklist-store.module';

@NgModule({
    imports: [
        LibraryStoreModule,
        LyricsStoreModule,
        MixerStoreModule,
        MopidyEventStoreModule,
        MopidyStoreModule,
        PlayerStoreModule,
        RouterStoreModule,
        TracklistStoreModule,
    ],
})
export class AppStoresModule {
}
