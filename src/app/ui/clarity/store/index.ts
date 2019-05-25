import { createFeatureSelector } from '@ngrx/store';
import { ClarityUiState } from './state/clarity-ui.state';

export const clarityUiFeatureName = 'clarity-ui';
export const selectClarityUiState = createFeatureSelector<ClarityUiState>(clarityUiFeatureName);
