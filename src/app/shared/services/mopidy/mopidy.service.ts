import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// @ts-ignore
import * as Mopidy from 'mopidy';
import { ApplicationState } from '../../../store/application/application.state';
import * as MopidyActions from '../../../store/mopidy/mopidy.actions';
import { IMopidy, Library, Playback, Tracklist } from '../../types/mopidy';

@Injectable({
    providedIn: 'root'
})
export class MopidyService {
    private mopidy: IMopidy;

    constructor(private store: Store<ApplicationState>) {
        this.mopidy = new Mopidy({
            autoConnect: false,
            backoffDelayMin: 1000,
            backoffDelayMax: 64000,
            callingConvention: 'by-position-or-by-name',
            console: (message: string, optionalParams: object) => console.log(message, optionalParams),
            webSocket: undefined,
            webSocketUrl: 'ws://localhost:6680/mopidy/ws/'
        });

        this.mopidy.on('application:online', () => {
            this.store.dispatch(new MopidyActions.StateChanged('on'));
            this.store.dispatch(new MopidyActions.GetVersion());
            this.store.dispatch(new MopidyActions.GetUriSchemes());
        });

        this.mopidy.on('application:offline', () => {
            this.store.dispatch(new MopidyActions.StateChanged('off'));
        });

        /*this.mopidy.on('event:trackPlaybackStarted', (log: string) => {
            console.log('started');
            console.log(log);
        });*/

        this.mopidy.on('state', (eventName: string, eventData: object) => {
            return this.eventLogger(eventName, eventData);
        });
        this.mopidy.on('event', (eventName: string, eventData: object) => {
            return this.eventLogger(eventName, eventData);
        });
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

    private eventLogger(eventName: string, eventData: object): void {
        const eventNameParts = eventName.split(':');
        this.store.dispatch({
            type: `[Mopidy Event] ${this.toSentenceCase(eventNameParts[0])}: ${this.toSentenceCase(eventNameParts[1])}`,
            payload: eventData,
        });
    }

    private toSentenceCase(value: string): string {
        if (!value || value === '') {
            return value;
        }

        value = value.trim();
        let newText = '';
        for (let i = 0; i < value.length; i++) {
            if (/[A-Z]/.test(value[i])
                && i !== 0
                && /[a-z]/.test(value[i - 1])) {
                newText += ' ';
            }
            if (i === 0 && /[a-z]/.test(value[i])) {
                newText += value[i].toUpperCase();
            } else {
                newText += value[i];
            }
        }

        return newText;
    }
}
