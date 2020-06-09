import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../core/core.module';
import { NoteReducer } from './crud/notes.reducer';
import { NoteState } from './crud/notes.model';

export const FEATURE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<ExamplesState> = {
  notes: NoteReducer
};

export interface ExamplesState {
  notes: NoteState;
}

export interface State extends AppState {
  examples: ExamplesState;
}
