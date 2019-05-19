/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */

import { ActionReducerMap } from '@ngrx/store';
import { LocalActionsUnion } from '../actions/local.actions';
import { LocalRootState } from '../state/local-root.state';
import { initialLocalState, localReducer } from './local.reducer';

export const initialLocalRootState: Readonly<LocalRootState> = {
    local: initialLocalState,
};

export const localRootReducer: ActionReducerMap<LocalRootState, LocalActionsUnion> = {
    local: localReducer,
};
