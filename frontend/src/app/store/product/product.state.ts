import { State } from '../../models/state';
import { ModelModel } from '../../models/model/model.model';

export type ProductState = State<ModelModel> & {
  successfulCreation: boolean | null;
}
