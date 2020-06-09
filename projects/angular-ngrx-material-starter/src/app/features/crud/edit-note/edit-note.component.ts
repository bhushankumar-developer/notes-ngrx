import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { State } from '../../examples.state';
export interface DialogData {
  id: string;
  title: string;
  color: string;
}
import { routeAnimations } from '../../../core/core.module';

@Component({
  selector: 'anms-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: [ './edit-note.component.scss' ],
  animations: [ routeAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNoteComponent implements OnInit {
  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData
  ) { }
  ngOnInit(): void { }

  onNoClick(data): void {
    this.dialogRef.close({ data: data, action: 'delete' });
  }

  editNote(data, selectedColor: any) {
    this.dialogRef.close({
      id: data.id,
      title: data.title,
      color: selectedColor,
      beforeEditNote: data.beforeEditNote,
    });
  }
}
