import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { initialApplicationState, metaReducers, reducers } from './store';
import { CustomSerializer } from './shared/utils/custom-serializer';
import { AppStoresModule } from './store/app-stores.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        AppStoresModule,
        BrowserAnimationsModule,
        BrowserModule,
        EffectsModule.forRoot([]),
        HttpClientModule,
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        StoreModule.forRoot(reducers, {metaReducers, initialState: initialApplicationState}),
        StoreRouterConnectingModule.forRoot({
            navigationActionTiming: NavigationActionTiming.PostActivation,
            serializer: CustomSerializer,
        }),
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
