import { LibraryState } from '../library/library.state';
import { LocalState } from '../local/local.state';
import { LyricsState } from '../lyrics/lyrics.state';
import { MixerState } from '../mixer/mixer.state';
import { MopidyState } from '../mopidy/mopidy.state';
import { PlayerState } from '../player/player.state';
import { TracklistState } from '../tracklist/tracklist.state';

export interface ApplicationState {
    local?: LocalState;
    library?: LibraryState;
    lyrics?: LyricsState;
    mixer?: MixerState;
    mopidy?: MopidyState;
    player?: PlayerState;
    tracklist?: TracklistState;
}
