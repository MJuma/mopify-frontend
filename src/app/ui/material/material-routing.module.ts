import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponent } from './material.component';

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
            /*{
                path: 'settings',
                loadChildren: './pages/settings/settings.module#SettingsModule',
            },*/
        ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class MaterialRoutingModule {
}
