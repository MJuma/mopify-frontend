import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { StoreModule } from '@ngrx/store';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HeaderModule } from './shared/components/header/header.module';
import { MusicNavModule } from './shared/components/music-nav/music-nav.module';
import { SideNavModule } from './shared/components/side-nav/side-nav.module';
import { initialApplicationState, metaReducers, reducers } from './store';
import { CustomSerializer } from './shared/utils/custom-serializer';
import { AppEffects } from './store/effects/app.effects';
import { MopidyEffects } from './store/effects/mopidy.effects';
import { TracklistEffects } from './store/effects/tracklist.effects';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        EffectsModule.forRoot([
            AppEffects,
            MopidyEffects,
            TracklistEffects,
        ]),
        HeaderModule,
        NotFoundModule,
        SideNavModule,
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        StoreModule.forRoot(reducers, {metaReducers, initialState: initialApplicationState}),
        StoreRouterConnectingModule.forRoot({
            navigationActionTiming: NavigationActionTiming.PostActivation,
            serializer: CustomSerializer,
        }),
        MusicNavModule,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
