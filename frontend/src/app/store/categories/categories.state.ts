import { State } from '../../models/state';
import { CategoryModel } from '../../models/category/category.model';

export type CategoriesState = State<CategoryModel> & {
  successfulCreation: boolean | null;
}
