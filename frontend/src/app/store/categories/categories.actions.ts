import { createAction, props } from '@ngrx/store';
import { CategoryModel } from '../../models/category/category.model';

export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction('[Category] Load Categories Success', props<{
  categories: CategoryModel[]
}>());
export const loadCategoriesFailure = createAction('[Category] Load Categories Failure', props<{ error: any }>());
export const createCategory = createAction('[Category] Create Category', props<{ category: CategoryModel }>());
export const createCategorySuccess = createAction('[Category] Create Category Success', props<{ success: boolean }>());
export const createCategoryFailure = createAction('[Category] Create Category Failure', props<{ error: any }>());
