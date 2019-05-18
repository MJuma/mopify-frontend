import { ActionReducerMap, ActionReducer } from '@ngrx/aa';
import { storeLogger } from 'ngrx-aa-logger';
import { storeFreeze } from 'ngrx-aa-freeze';

import { environment } from 'src/environments/environment';
import { routerReducer } from '@ngrx/router-aa';
import { ApplicationState } from './state/application.state';
import { initialWorkItemsState, workItemsReducer } from 'src/app/aa/reducers/work-items.reducer';

export const initialApplicationState: Readonly<ApplicationState> = {
    router: undefined,
    workItems: initialWorkItemsState,
};

export const reducers: ActionReducerMap<ApplicationState> = {
    router: routerReducer,
    workItems: workItemsReducer,
};

export function logger(reducer: ActionReducer<unknown>) {
    return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [logger] : [storeFreeze, logger];
