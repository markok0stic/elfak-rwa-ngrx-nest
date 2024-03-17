import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectSalesLoading, selectSuccessfulSalesCreation } from '../../store/sales/sale.selectors';
import { ProductModel } from '../../models/product/product.model';
import { selectAllProducts } from '../../store/product/product.selectors';
import { createSales } from '../../store/sales/sale.actions';
import { CreateSaleModel } from '../../models/sale/sale.model';
import { minArrayLength } from '../../services/custom-pipes/MinOneElementInArray';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.css']
})
export class SalesCreateComponent implements OnInit {
  saleForm: FormGroup;
  $loading: Observable<boolean>;
  created$: Observable<boolean | null>;
  products: ProductModel[];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.products = [];
     this.store.select(selectAllProducts).subscribe(state=> this.products = state.data);
    this.$loading = this.store.select(selectSalesLoading);
    this.created$ = this.store.select(selectSuccessfulSalesCreation);
    this.saleForm = this.fb.group({
      saleDetails: this.fb.array([], minArrayLength(1))
    });
  }

  ngOnInit(): void {
    this.created$.subscribe((success) => {
      if (success) {
        this.saleForm.reset();
        while (this.saleDetails.length) {
          this.saleDetails.removeAt(0);
        }
      }
    });
  }

  get saleDetails(): FormArray {
    return this.saleForm.get('saleDetails') as FormArray;
  }

  addSaleDetail() {
    const saleDetailForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      salesPrice: ['', Validators.required]
    });

    this.saleDetails.push(saleDetailForm);
  }

  removeSaleDetail(index: number) {
    this.saleDetails.removeAt(index);
  }

  handleProductChange(index: number, productId: number) {
    const selectedProduct = this.products.find(p => p.id === productId);
    if (selectedProduct) {
      this.saleDetails.at(index).get('salesPrice')!.setValue(selectedProduct.salesPrice);
    }
  }

  handleSubmit() {
    if (this.saleForm.invalid) {
      return;
    }

    const createSaleModel: CreateSaleModel = {
      saleDetails: this.saleDetails.getRawValue()
    };

    this.store.dispatch(createSales({ sale: createSaleModel }));
  }
}
