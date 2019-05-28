import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponent } from './material.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsModule } from './pages/settings/settings.module';

const routes: Routes = [
    {
        path: '',
        component: MaterialComponent,
        children: [
            /*{
                path: 'home',
                loadChildren: './pages/home/home.module#HomeModule',
            },*/
            {
                path: 'local',
                loadChildren: './pages/local/local.module#LocalModule',
            },
            {
                path: 'settings',
                component: SettingsComponent,
            },
        ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SettingsModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class MaterialRoutingModule {
}
