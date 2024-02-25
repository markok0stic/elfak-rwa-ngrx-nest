import { createAction, props } from '@ngrx/store';
import { ModelModel } from '../../models/model/model.model';

export const loadModels = createAction('[Models] Load Models');
export const loadModelsSuccess = createAction('[Models] Load Models Success', props<{ models: ModelModel[] }>());
export const loadModelsFailure = createAction('[Models] Load Models Failure', props<{ error: any }>());

export const createModels = createAction('[Models] Create Models', props<{ model: ModelModel }>());
export const createModelsSuccess = createAction('[Models] Create Models Success', props<{ success: boolean }>());
export const createModelsFailure = createAction('[Models] Create Models Failure', props<{ error: any }>());

export const editModels = createAction('[Models] Edit Models', props<{ model: ModelModel }>());
export const editModelsSuccess = createAction('[Models] Edit Models Success', props<{ model: ModelModel }>());
export const editModelsFailure = createAction('[Models] Edit Models Failure', props<{ error: any }>());

export const deleteModels = createAction('[Models] Delete Models', props<{ modelId: number }>());
export const deleteModelsSuccess = createAction('[Models] Delete Models Success', props<{ modelId: number }>());
export const deleteModelsFailure = createAction('[Models] Delete Models Failure', props<{ error: any }>());
