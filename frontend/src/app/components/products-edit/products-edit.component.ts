import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ProductModel } from '../../models/product/product.model';
import { editProducts } from '../../store/product/product.actions';
import { selectAllCategories } from '../../store/categories/categories.selectors';
import { CategoryModel } from '../../models/category/category.model';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  product$: Observable<ProductModel | null>;
  productForm: FormGroup | null;
  sectionTitle: string;
  categories: CategoryModel[];
  sku: string | null;
  private supplierSubject = new BehaviorSubject<ProductModel | null>(null);

  @Input()
  set product(value: ProductModel | null) {
    this.supplierSubject.next(value);
  }

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder) {
    this.productForm = null;
    this.product$ = of(null);
    this.sectionTitle = 'Product';
    this.categories = [];
    this.store.select(selectAllCategories).subscribe((categories) => this.categories = categories.data);
    this.sku = null;
  }

  ngOnInit(): void {
    this.product$ = this.supplierSubject.asObservable();

    this.product$.subscribe((product) => {
      if (product) {
        this.sku = product.sku;
        this.productForm = this.createFormGroup(product);
        this.productForm.disable();
      }
    });
  }

  createFormGroup(product: ProductModel | null) {
    return this._formBuilder.group({
      id: new FormControl(product?.id, Validators.required),
      name: new FormControl(product?.name, Validators.required),
      description: new FormControl(product?.description),
      sku: new FormControl(product?.sku, Validators.required),
      quantity: new FormControl(product?.quantity, Validators.required),
      purchasePrice: new FormControl(product?.purchasePrice, Validators.required),
      salesPrice: new FormControl(product?.salesPrice, Validators.required),
      categoryId: new FormControl(product?.category.id, Validators.required),
    });
  }

  toggleEdit() {
    if (this.productForm) {
      if (this.productForm.disabled) {
        this.sectionTitle = 'Edit Product';
        this.productForm.enable();
      } else {
        this.sectionTitle = 'Product';
        this.productForm.disable();
      }
    }
  }

  handleEdit() {
    if (!this.productForm || this.productForm.invalid)
      return;

    const formValue = { ...this.productForm.value };
    this.store.dispatch(editProducts({ product: formValue }));
  }
}
