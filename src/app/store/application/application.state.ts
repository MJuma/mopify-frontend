import { LocalState } from '../local/local.state';
import { MopidyState } from '../mopidy/mopidy.state';
import { PlayerState } from '../player/player.state';
import { TracklistState } from '../tracklist/tracklist.state';

export interface ApplicationState {
    local?: LocalState;
    mopidy?: MopidyState;
    player?: PlayerState;
    tracklist?: TracklistState;
}
