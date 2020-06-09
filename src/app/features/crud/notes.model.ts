import { EntityState } from '@ngrx/entity';

export interface Note {
  id: string;
  title: string;
  color: string;
}

export interface NoteState extends EntityState<Note> {}
