import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, mapTo, tap } from 'rxjs/operators';
import { selectMopidyConnectionState } from '../../../store/reducers/mopidy.reducer';
import { ApplicationState } from '../../../store/state/application.state';

@Injectable({
    providedIn: 'root'
})
export class MopidyConnectedResolverService implements CanLoad {

    constructor(private store: Store<ApplicationState>) {
    }

    public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select(selectMopidyConnectionState).pipe(
            tap(x => console.log(x)),
            filter((state: 'on' | 'off') => state === 'on'),
            tap(x => console.log(x)),
            mapTo(true),
            tap(x => console.log(x)),
        );
    }
}
