import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';

export interface ApplicationState {
    router: RouterReducerState<SerializedRouterStateSnapshot>;
}
