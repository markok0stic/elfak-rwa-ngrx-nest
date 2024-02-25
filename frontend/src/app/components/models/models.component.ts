import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelsState } from '../../store/models/models.state';
import { ModelModel } from '../../models/model/model.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { selectAllModels } from '../../store/models/models.selectors';
import * as ModelsActions from '../../store/models/models.actions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models$: Observable<ModelsState>;
  columnsToDisplay: string[];
  data: ModelModel[] = [];
  modelToEdit: ModelModel | null;
  loading: boolean;

  constructor(private _store: Store<AppState>, private _dialog: MatDialog) {
    this.modelToEdit = null;
    this.models$ = this._store.select(selectAllModels);
    this.columnsToDisplay = ['id', 'name', 'status'];
    this.loading = false;
  }

  ngOnInit(): void {
    this._store.dispatch(ModelsActions.loadModels());
  }

  handleEdit(model: ModelModel) {
    this.modelToEdit = model;
  }

  handleDelete(model: ModelModel) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(ModelsActions.deleteModels({modelId: model.id}));
      }
    });
  }
}
