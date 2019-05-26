import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../../../store/application/application.state';
import * as fromMopidyReducer from '../../../../store/mopidy/mopidy.reducer';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
    public webSocketUrl$: Observable<string>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.webSocketUrl$ = this.store.select(fromMopidyReducer.selectWebSocketUrl);
    }

    public saveSettingsForm(form: {}): void {
        console.log(form);
    }
}
