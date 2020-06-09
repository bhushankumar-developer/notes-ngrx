import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { State } from '../../examples.state';
import { Note } from '../notes.model';
import { actionNotesDeleteOne, actionNotesUpsertOne } from '../notes.actions';
import { selectSelectedNote, selectAllNotes } from '../notes.selectors';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  NoteFormGroup = this.fb.group(CrudComponent.createNote());
  notes: Observable<Note[]> = this.store.pipe(select(selectAllNotes));
  selectedNote$: Observable<Note> = this.store.pipe(select(selectSelectedNote));

  isEditing: boolean;
  event: any;
  static createNote(): Note {
    return {
      id: uuid(),
      title: '',
      color: ''
    };
  }
  title: string;

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  openDialog(note: Note): void {
    this.isEditing = true;
    const dialogRef = this.dialog.open(EditNoteComponent, {
      height: '150px',
      width: '450px',
      data: {
        id: note.id,
        title: note.title,
        color: note.color,
        beforeEditNote: note
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.action !== 'delete') {
          this.editOrRestoreNote(dialogResult);
          this.showToastMessage(
            'Note Edited',
            'Undo',
            dialogResult.beforeEditNote
          );
        } else {
          let deleteNoteData = dialogResult.data;
          this.store.dispatch(
            actionNotesDeleteOne({ id: dialogResult.data.id })
          );
          this.showToastMessage('Note Deleted', 'Undo', deleteNoteData);
          this.router.navigate(['examples/note']);
        }
      }
    });
  }
  ngOninit() {}

  deselect() {
    this.isEditing = false;
    this.router.navigate(['examples/note']);
  }

  edit(note: Note) {
    this.isEditing = true;
    this.NoteFormGroup.setValue(note);
  }

  addNew() {
    this.NoteFormGroup.reset();
    this.NoteFormGroup.setValue(CrudComponent.createNote());
    this.isEditing = true;
  }

  save(color: any) {
    if (this.NoteFormGroup.valid) {
      let date = new Date();
      this.NoteFormGroup.controls['color'].setValue(color);
      const note = this.NoteFormGroup.value;
      this.store.dispatch(actionNotesUpsertOne({ note }));
      this.isEditing = false;
      this.NoteFormGroup.reset();
      let snackBarRef = this.snackBar.open('Note Added', 'Delete', {
        duration: 4000
      });
      snackBarRef.onAction().subscribe(() => {
        this.store.dispatch(actionNotesDeleteOne({ id: note.id }));
      });
      this.router.navigate(['examples/note']);
    }
  }

  editOrRestoreNote(data: any) {
    this.NoteFormGroup.controls['id'].setValue(data.id);
    this.NoteFormGroup.controls['color'].setValue(data.color);
    this.NoteFormGroup.controls['title'].setValue(data.title);
    const note = this.NoteFormGroup.value;
    this.store.dispatch(actionNotesUpsertOne({ note }));
    this.NoteFormGroup.reset();
  }

  showToastMessage(title, actionTitle, data) {
    let snackBarRef = this.snackBar.open(title, actionTitle, {
      duration: 4000
    });
    snackBarRef.onAction().subscribe(() => {
      this.editOrRestoreNote(data);
    });
  }
}
