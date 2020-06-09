import { actionNotesDeleteOne, actionNotesUpsertOne } from './notes.actions';

describe('Notes Actions', () => {
  it('should create ActionNotesUpsertOne action', () => {
    const action = actionNotesUpsertOne({
      note: {
        id: '1',
        title: 'test',
        color:'white'
      }
    });
    expect(action.type).toEqual(actionNotesUpsertOne.type);
    expect(action.note).toEqual(
      jasmine.objectContaining({
        id: '1',
        title: 'test',
        author: 'test',
        description: ''
      })
    );
  });

  it('should create ActionNotesDeleteOne action', () => {
    const action = actionNotesDeleteOne({ id: '1' });
    expect(action.type).toEqual(actionNotesDeleteOne.type);
    expect(action.id).toEqual('1');
  });
});
