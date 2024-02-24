import { State } from '../../models/state';
import { BrandModel } from '../../models/brand/brand.model';

export type BrandsState = State<BrandModel> & {
  successfulCreation: boolean | null;
}
