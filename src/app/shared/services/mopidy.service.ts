import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// @ts-ignore
import * as Mopidy from 'mopidy';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApplicationState } from '../../store/application/application.state';
import * as MopidyActions from '../../store/mopidy/mopidy.actions';
import { MopidyState } from '../../store/mopidy/mopidy.state';
import { IMopidy, Library, Mixer, Playback, Tracklist } from '../types/mopidy';
import * as fromMopidyReducer from '../../store/mopidy/mopidy.reducer';
import { toSentenceCase } from '../utils/functions';

@Injectable({
    providedIn: 'root'
})
export class MopidyService {
    private mopidy: IMopidy;

    constructor(private store: Store<ApplicationState>) {
        this.initialize().pipe(
            take(1),
        ).subscribe();
    }

    public initialize(): Observable<void> {
        return this.store.select(fromMopidyReducer.selectMopidyState).pipe(
            map((state: MopidyState) => {
                this.mopidy = new Mopidy({
                    autoConnect: false,
                    backoffDelayMin: 1000,
                    backoffDelayMax: 64000,
                    callingConvention: 'by-position-or-by-name',
                    console: (message: string, optionalParams: object) => console.log(message, optionalParams),
                    webSocket: undefined,
                    webSocketUrl: state.webSocketUrl,
                });

                this.mopidy.on('application:online', () => {
                    this.store.dispatch(new MopidyActions.StateChanged('on'));
                    this.store.dispatch(new MopidyActions.GetVersion());
                    this.store.dispatch(new MopidyActions.GetUriSchemes());
                });

                this.mopidy.on('application:offline', () => {
                    this.store.dispatch(new MopidyActions.StateChanged('off'));
                });

                this.mopidy.on('state', (eventName: string, eventData: object) => {
                    return this.eventLogger(eventName, eventData);
                });
                this.mopidy.on('event', (eventName: string, eventData: object) => {
                    return this.eventLogger(eventName, eventData);
                });
            })
        );
    }

    public reinitialize(): void {
        this.disconnect();
        this.initialize().pipe(
            take(1),
        ).subscribe(() => this.connect());
    }

    public connect(): void {
        this.mopidy.connect();
    }

    public disconnect(): void {
        this.mopidy.close();
    }

    public getVersion(): Promise<string> {
        return this.mopidy.getVersion({});
    }

    public getUriSchemes(): Promise<string[]> {
        return this.mopidy.getUriSchemes({});
    }

    public tracklist(): Tracklist {
        return this.mopidy.tracklist;
    }

    public playback(): Playback {
        return this.mopidy.playback;
    }

    public library(): Library {
        return this.mopidy.library;
    }

    public mixer(): Mixer {
        return this.mopidy.mixer;
    }

    private eventLogger(eventName: string, eventData: object): void {
        const eventNameParts = eventName.split(':');
        this.store.dispatch({
            type: `[Mopidy Event] ${toSentenceCase(eventNameParts[0])}: ${toSentenceCase(eventNameParts[1])}`,
            payload: eventData,
        });
    }
}
