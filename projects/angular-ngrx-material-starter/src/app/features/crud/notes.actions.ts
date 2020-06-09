import { createAction, props } from '@ngrx/store';
import { Note } from './notes.model';

export const actionNotesUpsertOne = createAction(
  '[Notes] Upsert One',
  props<{ note: Note }>()
);

export const actionNotesDeleteOne = createAction(
  '[Notes] Delete One',
  props<{ id: string }>()
);
