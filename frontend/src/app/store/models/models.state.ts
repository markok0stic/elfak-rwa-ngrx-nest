import { State } from '../../models/state';
import { ModelModel } from '../../models/model/model.model';

export type ModelsState = State<ModelModel> & {
  successfulCreation: boolean | null;
}
