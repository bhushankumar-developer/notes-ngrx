import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../core/core.module';

import { State } from '../examples.state';
import { actionNotesDeleteOne, actionNotesUpsertOne } from './notes.actions';
import { selectNotes } from './notes.selectors';

export const Notes_KEY = 'EXAMPLES.Notes';

@Injectable()
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) {}

  persistNotes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionNotesUpsertOne, actionNotesDeleteOne),
        withLatestFrom(this.store.pipe(select(selectNotes))),
        tap(([actions, notesState]) =>
          this.localStorageService.setItem(Notes_KEY, notesState)
        )
      ),
    { dispatch: false }
  );
}
