import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlaybackState, PlaybackStates, Track } from '../../../../shared/types/mopidy';
import { ApplicationState } from '../../../../store/application/application.state';
import * as PlayerActions from '../../../../store/player/player.actions';
import * as TracklistActions from '../../../../store/tracklist/tracklist.actions';
import * as MixerActions from '../../../../store/mixer/mixer.actions';
import * as fromPlayerReducer from '../../../../store/player/player.reducer';
import * as fromTracklistReducer from '../../../../store/tracklist/tracklist.reducer';
import * as fromMixerReducer from '../../../../store/mixer/mixer.reducer';
import { RepeatState, ShuffleState } from '../../../../store/tracklist/tracklist.state';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {
    public playbackStates: typeof PlaybackStates = PlaybackStates;
    public shuffleStates: typeof ShuffleState = ShuffleState;
    public repeatStates: typeof RepeatState = RepeatState;

    public currentTrack$: Observable<Track | undefined>;
    public timePosition$: Observable<number>;
    public playbackState$: Observable<PlaybackState>;
    public shuffleState$: Observable<ShuffleState>;
    public repeatState$: Observable<RepeatState>;
    public consume$: Observable<boolean>;
    public volume$: Observable<number | undefined>;
    public mute$: Observable<boolean | undefined>;

    constructor(private store: Store<ApplicationState>) {
    }

    ngOnInit() {
        this.currentTrack$ = this.store.select(fromPlayerReducer.selectCurrentTrack);
        this.timePosition$ = this.store.select(fromPlayerReducer.selectTimePosition);
        this.playbackState$ = this.store.select(fromPlayerReducer.selectPlaybackState);
        this.shuffleState$ = this.store.select(fromTracklistReducer.selectShuffleState);
        this.repeatState$ = this.store.select(fromTracklistReducer.selectRepeatState);
        this.consume$ = this.store.select(fromTracklistReducer.selectConsume);
        this.volume$ = this.store.select(fromMixerReducer.selectVolume);
        this.mute$ = this.store.select(fromMixerReducer.selectMuteState);
    }

    public togglePlayPause(): void {
        this.store.dispatch(new PlayerActions.TogglePlayPause());
    }

    public forward(): void {
        this.store.dispatch(new PlayerActions.Forward());
    }

    public back(): void {
        this.store.dispatch(new PlayerActions.Back());
    }

    public toggleShuffle(): void {
        this.store.dispatch(new TracklistActions.ToggleShuffle());
    }

    public toggleRepeat(): void {
        this.store.dispatch(new TracklistActions.ToggleRepeat());
    }

    public seek(seekPosition: number): void {
        this.store.dispatch(new PlayerActions.Seek({ time_position: seekPosition }));
    }

    public setVolume(volume: string): void {
        this.store.dispatch(new MixerActions.SetVolume({volume: +volume}));
    }

    public toggleMute(): void {
        this.store.dispatch(new MixerActions.ToggleMute());
    }

    public toggleConsume(): void {
        this.store.dispatch(new TracklistActions.ToggleConsume());
    }
}
