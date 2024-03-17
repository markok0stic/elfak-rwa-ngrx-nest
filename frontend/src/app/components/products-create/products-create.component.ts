import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ProductsActions from '../../store/product/product.actions';
import { selectProductsLoading, selectSuccessfulProductCreation } from '../../store/product/product.selectors';
import { CategoryModel } from '../../models/category/category.model';
import { selectAllCategories } from '../../store/categories/categories.selectors';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {
  productForm: FormGroup;
  $loading: Observable<boolean>;
  creationSuccess: boolean;
  created$: Observable<boolean | null>;
  categories: CategoryModel[];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.productForm = this.createFormGroup();
    this.$loading = this.store.select(selectProductsLoading);
    this.creationSuccess = false;
    this.created$ = this.store.select(selectSuccessfulProductCreation);
    this.categories = [];
    this.store.select(selectAllCategories).subscribe((categories) => this.categories = categories.data);
  }

  ngOnInit(): void {
    this.created$.subscribe((success)=>{
      this.creationSuccess = !!success;
      if(success) {
        this.handleReset()
      }
    });
  }

  createFormGroup() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      sku: new FormControl('', Validators.required),
      quantity: new FormControl(0, Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      salesPrice: new FormControl('', Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });
  }

  handleSubmit() {
    if (!this.productForm.valid) {
      return;
    }

    this.store.dispatch(ProductsActions.createProducts({ product: this.productForm.value }));
  }

  handleReset() {
    this.creationSuccess = false;
    this.productForm = this.createFormGroup();
  }
}
