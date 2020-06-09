import * as assert from 'assert';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../core/core.module';

import { NoteState } from './notes.model';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { NotesEffects, Notes_KEY } from './notes.effects';
import { actionNotesDeleteOne, actionNotesUpsertOne } from './notes.actions';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('NotesEffects', () => {
  describe('persistNotes', () => {
    const notesState: NoteState = {
      entities: {
        '1': {
          id: '1',
          title: 'Title',
          color:'white'
        }
      },
      ids: ['1']
    };
    let localStorage: LocalStorageService;
    let store: Store<any>;

    beforeEach(() => {
      localStorage = jasmine.createSpyObj('localStorage', ['setItem']);
      store = of({
        examples: {
          notes: notesState
        }
      }) as any;
    });

    it('should not dispatch any actions', () => {
      const actions = new Actions(EMPTY);
      const effects = new NotesEffects(actions, store, localStorage);
      const metadata = getEffectsMetadata(effects);

      expect(metadata.persistNotes.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService for delete one action', () => {
      scheduler.run(helpers => {
        const { cold } = helpers;
        const action = actionNotesDeleteOne({ id: '1' });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new NotesEffects(actions, store, localStorage);

        effects.persistNotes.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            Notes_KEY,
            notesState
          );
        });
      });
    });

    it('should call setItem on LocalStorageService for upsert one action', () => {
      scheduler.run(helpers => {
        const { cold } = helpers;
        const action = actionNotesUpsertOne({ note: {} as any });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new NotesEffects(actions, store, localStorage);

        effects.persistNotes.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            Notes_KEY,
            notesState
          );
        });
      });
    });
  });
});
