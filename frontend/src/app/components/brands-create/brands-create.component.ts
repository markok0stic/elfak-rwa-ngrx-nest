import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectSuccessfulSupplierCreation, selectSuppliersLoading } from '../../store/suppliers/suppliers.selectors';
import { StatusEnum } from '@shared/enums/status.enum';
import * as BrandsActions from '../../store/brands/brands.actions';
import { loadBrandsSuccess } from '../../store/brands/brands.actions';
import { selectSuccessfulBrandCreation } from '../../store/brands/brands.selectors';

@Component({
  selector: 'app-brands-create',
  templateUrl: './brands-create.component.html',
  styleUrls: ['./brands-create.component.css']
})
export class BrandsCreateComponent implements OnInit {
  brandForm: FormGroup;
  $loading: Observable<boolean>;
  creationSuccess: boolean;
  created$: Observable<boolean | null>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.brandForm = this.createFormGroup();
    this.$loading = this.store.select(selectSuppliersLoading);
    this.creationSuccess = false;
    this.created$ = this.store.select(selectSuccessfulBrandCreation);
  }

  ngOnInit(): void {
    this.created$.subscribe((success)=>{
      this.creationSuccess = !!success;
      console.log(!!success)
      if(success) {
        this.handleReset()
      }
    });
  }

  createFormGroup() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      status: new FormControl(StatusEnum.Active)
    });
  }

  handleSubmit() {
    if (!this.brandForm.valid) {
      return;
    }

    this.store.dispatch(BrandsActions.createBrands({ brand: this.brandForm.value }));
  }

  handleReset() {
    this.creationSuccess = false;
    this.brandForm = this.createFormGroup();
  }

  protected readonly loadBrandsSuccess = loadBrandsSuccess;
}
