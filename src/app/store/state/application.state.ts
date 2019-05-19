import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { MopidyState } from './mopidy.state';
import { TracklistState } from './tracklist.state';

export interface ApplicationState {
    router: RouterReducerState<SerializedRouterStateSnapshot> | undefined;
    mopidy: MopidyState;
    tracklist: TracklistState;
}
