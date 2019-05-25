import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// @ts-ignore
import * as Mopidy from 'mopidy';
import { from, Observable } from 'rxjs';
import { ApplicationState } from '../../../store/application/application.state';
import * as MopidyActions from '../../../store/mopidy/mopidy.actions';
import {
    IMopidy,
    MopidyGetImagesResponse,
    MopidyLibraryBrowseRefreshParams,
    MopidyLibraryGetImagesParams,
    MopidyLibraryLookupParams,
    MopidyLibrarySearchParams,
    MopidyPlaybackPlayParams, MopidyPlaybackSeekParams, MopidyPlaybackSetStateParams,
    MopidyTracklistAddParams,
    MopidyTracklistIndexParams,
    MopidyTracklistMoveParams,
    MopidyTracklistShuffleParams, MopidyTracklistSliceParams, PlaybackState,
    Ref,
    SearchResult,
    TlTrack,
    Track
} from '../../types/mopidy';

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

    public tracklistAdd(params: MopidyTracklistAddParams): Observable<TlTrack[]> {
        return from(this.mopidy.tracklist.add(params));
    }

    public tracklistClear(): void {
        return this.mopidy.tracklist.clear();
    }

    public tracklistMove(params: MopidyTracklistMoveParams): void {
        return this.mopidy.tracklist.move(params);
    }

    public tracklistShuffle(params: MopidyTracklistShuffleParams): void {
        return this.mopidy.tracklist.shuffle(params);
    }

    public tracklistGetTlTracks(): Observable<TlTrack[]> {
        return from(this.mopidy.tracklist.getTlTracks());
    }

    public tracklistIndex(params: MopidyTracklistIndexParams): Observable<number> {
        return from(this.mopidy.tracklist.index(params));
    }

    public tracklistGetVersion(): Observable<number> {
        return from(this.mopidy.tracklist.getVersion());
    }

    public tracklistGetLength(): Observable<number> {
        return from(this.mopidy.tracklist.getLength());
    }

    public tracklistGetTracks(): Observable<Track[]> {
        return from(this.mopidy.tracklist.getTracks());
    }

    public tracklistSlice(params: MopidyTracklistSliceParams): Observable<TlTrack[]> {
        return from(this.mopidy.tracklist.slice(params));
    }

    public playbackPlay(params: MopidyPlaybackPlayParams): void {
        return this.mopidy.playback.play(params);
    }

    public playbackNext(): void {
        return this.mopidy.playback.next();
    }

    public playbackPrevious(): void {
        return this.mopidy.playback.previous();
    }

    public playbackStop(): void {
        return this.mopidy.playback.stop();
    }

    public playbackPause(): void {
        return this.mopidy.playback.pause();
    }

    public playbackResume(): void {
        return this.mopidy.playback.resume();
    }

    public playbackSeek(params: MopidyPlaybackSeekParams): Observable<boolean> {
        return from(this.mopidy.playback.seek(params));
    }

    public playbackGetCurrentTlTrack(): Observable<TlTrack | undefined> {
        return from(this.mopidy.playback.getCurrentTlTrack());
    }

    public playbackGetCurrentTrack(): Observable<Track | undefined> {
        return from(this.mopidy.playback.getCurrentTrack());
    }

    public playbackGetStreamTitle(): Observable<string | undefined> {
        return from(this.mopidy.playback.getStreamTitle());
    }

    public playbackGetTimePosition(): Observable<number | undefined> {
        return from(this.mopidy.playback.getTimePosition());
    }

    public playbackGetState(): Observable<PlaybackState> {
        return from(this.mopidy.playback.getState());
    }

    public playbackSetState(params: MopidyPlaybackSetStateParams): void {
        return this.mopidy.playback.setState(params);
    }

    public libraryBrowse(params: MopidyLibraryBrowseRefreshParams): Observable<Ref[]> {
        return from(this.mopidy.library.browse(params));
    }

    public librarySearch(params: MopidyLibrarySearchParams): Observable<SearchResult[]> {
        return from(this.mopidy.library.search(params));
    }

    public libraryLookup(params: MopidyLibraryLookupParams): Observable<Track[]> {
        return from(this.mopidy.library.lookup(params));
    }

    public libraryRefresh(params: MopidyLibraryBrowseRefreshParams): void {
        return this.mopidy.library.refresh(params);
    }

    public libraryGetImages(params: MopidyLibraryGetImagesParams): Observable<MopidyGetImagesResponse> {
        return from(this.mopidy.library.getImages(params));
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
