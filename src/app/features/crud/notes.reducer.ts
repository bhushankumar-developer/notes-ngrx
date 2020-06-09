import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Note, NoteState } from './notes.model';
import { actionNotesDeleteOne, actionNotesUpsertOne } from './notes.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Note, b: Note): number {
  return a.title
    .toLowerCase()
    .localeCompare(b.title.toLowerCase(), 'en', { sensitivity: 'base' });
}

export const NoteAdapter: EntityAdapter<Note> = createEntityAdapter<Note>({
  sortComparer: sortByTitle
});

export const initialState: NoteState = NoteAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      title: 'Test',
      color: 'white'
    }
  }
});

const reducer = createReducer(
  initialState,
  on(actionNotesUpsertOne, (state, { note }) =>
    NoteAdapter.upsertOne(note, state)
  ),
  on(actionNotesDeleteOne, (state, { id }) => NoteAdapter.removeOne(id, state))
);

export function NoteReducer(state: NoteState | undefined, action: Action) {
  return reducer(state, action);
}
