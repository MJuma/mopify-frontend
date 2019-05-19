import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from 'src/environments/environment';
import { MopidyActionsUnion } from './actions/mopidy.actions';
import { TracklistActionsUnion } from './actions/tracklist.actions';
import { initialMopidyState, mopidyReducer } from './reducers/mopidy.reducer';
import { initialTracklistState, tracklistReducer } from './reducers/tracklist.reducer';
import { ApplicationState } from './state/application.state';

export const initialApplicationState: Readonly<ApplicationState> = {
    router: undefined,
    mopidy: initialMopidyState,
    tracklist: initialTracklistState,
};

export type ApplicationActionsIntersection =
    MopidyActionsUnion
    & TracklistActionsUnion;

export const reducers: ActionReducerMap<ApplicationState, ApplicationActionsIntersection> = {
    router: routerReducer,
    mopidy: mopidyReducer,
    tracklist: tracklistReducer,
};

export function logger(reducer: ActionReducer<unknown>) {
    return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<ApplicationState | unknown, Action>[] = environment.production ? [logger] : [storeFreeze, logger];
