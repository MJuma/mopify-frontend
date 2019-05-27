import { LibraryState } from '../library/library.state';
import { LyricsState } from '../lyrics/lyrics.state';
import { MixerState } from '../mixer/mixer.state';
import { MopidyState } from '../mopidy/mopidy.state';
import { PlayerState } from '../player/player.state';
import { TracklistState } from '../tracklist/tracklist.state';

export interface ApplicationState {
    library?: LibraryState;
    lyrics?: LyricsState;
    mixer?: MixerState;
    mopidy?: MopidyState;
    player?: PlayerState;
    tracklist?: TracklistState;
}
