/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */

import { createFeatureSelector } from '@ngrx/store';
import { LocalRootState } from './state/local-root.state';

export const localRootFeatureName = 'localRootState';
export const selectLocalRootState = createFeatureSelector<LocalRootState>(localRootFeatureName);
