import { NoteState } from './notes.model';
import { NoteReducer, initialState } from './notes.reducer';
import { actionNotesDeleteOne, actionNotesUpsertOne } from './notes.actions';

describe('NoteReducer', () => {
  const TEST_INITIAL_STATE: NoteState = {
    ids: [ '123' ],
    entities: {
      '123': {
        id: '123',
        title: 'Reactive Programming with Angular and ngrx',
        color: 'white'
      }
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = NoteReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a note', () => {
    const action = actionNotesUpsertOne({
      note: {
        id: '1234',
        title: 'test',
        color: 'white'
      }
    });
    const state = NoteReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities[ '1234' ].title).toEqual('test');
  });

  it('should update a note', () => {
    const id = TEST_INITIAL_STATE.ids[ 0 ] as string;
    const action = actionNotesUpsertOne({
      note: {
        id: id,
        title: 'updated',
        color: 'white'
      }
    });

    const state = NoteReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[ id ]).toEqual(
      jasmine.objectContaining({
        title: 'updated',
        color: 'white'
      })
    );
  });

  it('should remove a note', () => {
    const id = TEST_INITIAL_STATE.ids[ 0 ] as string;
    const action = actionNotesDeleteOne({ id });
    const state = NoteReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[ id ]).toBe(undefined);
  });
});
