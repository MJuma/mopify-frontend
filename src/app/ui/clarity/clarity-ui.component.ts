import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationState } from '../../store/application/application.state';

@Component({
    templateUrl: './clarity-ui.component.html',
    styleUrls: ['./clarity-ui.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClarityUiComponent implements OnInit {
    public currentRoute$: Observable<string>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.currentRoute$ = this.store.select('router').pipe(
            map((routerState: RouterReducerState) => routerState.state.url),
        );
    }
}
