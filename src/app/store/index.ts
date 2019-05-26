import { ActionReducerMap, ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { LoggerOptions, storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from 'src/environments/environment';
import { ApplicationState } from './application/application.state';

export const initialApplicationState: Readonly<ApplicationState> = {
};

export const reducers: ActionReducerMap<ApplicationState> = {
};

const loggerOptions: LoggerOptions = {
    filter: {
        blacklist: [
            '[Player] Get Time Position Success',
        ],
    },
};

export function logger(reducer: ActionReducer<unknown>) {
    return storeLogger(loggerOptions)(reducer);
}

export const metaReducers: MetaReducer<ApplicationState | unknown, Action>[] = environment.production ? [logger] : [storeFreeze, logger];
