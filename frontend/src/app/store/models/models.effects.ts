import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ModelsActions from './models.actions';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ModelsService } from '../../services/models/models.service';
import { ModelModel } from '../../models/model/model.model';

@Injectable()
export class ModelsEffects {
  loadModels$ = createEffect(() => this.actions$.pipe(
    ofType(ModelsActions.loadModels),
    mergeMap(() => this.modelsService.getAllModels().pipe(
      map(models => ModelsActions.loadModelsSuccess({ models })),
      catchError(error => {
        this.notificationsService.showErrorSnackBar(error.error);
        return of(ModelsActions.loadModelsFailure({ error: error.error.message }));
      }),
    )),
  ));

  createModels$ = createEffect(() => this.actions$.pipe(
    ofType(ModelsActions.createModels),
    mergeMap(({ model }) =>
      this.modelsService.addModel(model).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar('Model successfully created');
          return ModelsActions.createModelsSuccess({ success: true });
        }),
        tap(() => {
          this.store.dispatch(ModelsActions.loadModels());
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(ModelsActions.createModelsFailure({ error: error.error.message }));
        }),
      ),
    ),
  ));

  editModels$ = createEffect(() => this.actions$.pipe(
    ofType(ModelsActions.editModels),
    mergeMap(({ model }) =>
      this.modelsService.updateModel(model).pipe(
        map((updatedModel: ModelModel) => {
          this.notificationsService.showSuccessSnackBar('Model updated successfully');
          return ModelsActions.editModelsSuccess({ model: updatedModel });
        }),
        tap(() => {
          this.store.dispatch(ModelsActions.loadModels());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(ModelsActions.editModelsFailure({ error }));
        }),
      ),
    ),
  ));

  deleteModels$ = createEffect(() => this.actions$.pipe(
    ofType(ModelsActions.deleteModels),
    mergeMap(({ modelId }) =>
      this.modelsService.deleteModel(modelId).pipe(
        map(() => {
          this.notificationsService.showSuccessSnackBar(`Model with id: ${modelId} deleted successfully`);
          return ModelsActions.deleteModelsSuccess({ modelId });
        }),
        tap(() => {
          this.store.dispatch(ModelsActions.loadModels());
        }),
        catchError(error => {
          this.notificationsService.showErrorSnackBar(error.error);
          return of(ModelsActions.deleteModelsFailure({ error }));
        }),
      ),
    ),
  ));

  constructor(
    private actions$: Actions,
    private modelsService: ModelsService,
    private notificationsService: NotificationsService,
    private store: Store<AppState>
  ) {}
}
