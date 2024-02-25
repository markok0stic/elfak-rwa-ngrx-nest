import { createReducer, on } from '@ngrx/store';
import * as ModelsActions from './models.actions';
import { ModelsState } from './models.state';

export const initialState: ModelsState = {
  data: [],
  loading: false,
  error: null,
  successfulCreation: null,
};

export const modelsReducers = createReducer(
  initialState,
  on(ModelsActions.loadModels, state => ({ ...state, loading: true })),
  on(ModelsActions.loadModelsSuccess, (state, { models }) => ({
    ...state,
    data: models,
    loading: false,
  })),
  on(ModelsActions.loadModelsFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(ModelsActions.createModels, state => ({
    ...state,
    loading: true,
    successfulCreation: null
  })),
  on(ModelsActions.createModelsSuccess, (state) => ({
    ...state,
    loading: false,
    successfulCreation: true
  })),
  on(ModelsActions.createModelsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    successfulCreation: false,
    error: error
  })),
  on(ModelsActions.editModels, state => ({
    ...state,
    loading: true
  })),
  on(ModelsActions.editModelsSuccess, (state, { model }) => ({
    ...state,
    loading: false
  })),
  on(ModelsActions.editModelsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(ModelsActions.deleteModels, state => ({
    ...state,
    loading: true
  })),
  on(ModelsActions.deleteModelsSuccess, (state, { modelId }) => ({
    ...state,
    loading: false
  })),
  on(ModelsActions.deleteModelsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);

