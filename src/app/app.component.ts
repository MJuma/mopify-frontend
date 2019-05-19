import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store/state/application.state';
import * as MopidyActions from './store/actions/mopidy.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private store: Store<ApplicationState>) {}

    public ngOnInit(): void {
        this.store.dispatch(new MopidyActions.Connect());
    }
}
