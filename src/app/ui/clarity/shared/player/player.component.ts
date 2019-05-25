import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/application/application.state';
import * as PlayerActions from '../../../../store/player/player.actions';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
    }

    public onTogglePlayPause(): void {
        this.store.dispatch(new PlayerActions.TogglePlayPause());
    }

    public onForward(): void {
        this.store.dispatch(new PlayerActions.Forward());
    }
}
