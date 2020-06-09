import { createSelector } from '@ngrx/store';

import { selectRouterState } from '../../core/core.module';
import { selectExamples, ExamplesState } from '../examples.state';

import { NoteAdapter } from './notes.reducer';

const { selectEntities, selectAll } = NoteAdapter.getSelectors();

export const selectNotes = createSelector(
  selectExamples,
  (state: ExamplesState) => state.notes
);

export const selectAllNotes = createSelector(selectNotes, selectAll);
export const selectNotesEntities = createSelector(selectNotes, selectEntities);

export const selectSelectedNote = createSelector(
  selectNotesEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);
