import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../../../store/application/application.state';
import * as MaterialActions from '../../store/material/material.actions';
import * as fromMaterialReducer from '../../store/material/material.reducer';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
    themes$: Observable<string[]>;
    selectedTheme$: Observable<string>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.themes$ = this.store.select(fromMaterialReducer.selectThemes);
        this.selectedTheme$ = this.store.select(fromMaterialReducer.selectTheme);


    }

    public changeTheme(theme: string): void {
        console.log(theme)
        this.store.dispatch(new MaterialActions.SetTheme(theme));
    }
}
