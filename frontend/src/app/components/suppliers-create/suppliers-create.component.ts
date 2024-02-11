import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as SuppliersActions from '../../store/suppliers/suppliers.actions';
import { Observable } from 'rxjs';
import { selectSuppliersLoading,
  selectSuccessfulSupplierCreation
} from '../../store/suppliers/suppliers.selectors';
import { StatusEnum } from '@shared/enums/status.enum';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrls: ['./suppliers-create.component.css'],
})
export class SuppliersCreateComponent implements OnInit {
  supplierForm: FormGroup;
  $loading: Observable<boolean>;
  creationSuccess: boolean;
  created$: Observable<boolean | null>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.supplierForm = this.createFormGroup();
    this.$loading = this.store.select(selectSuppliersLoading);
    this.creationSuccess = false;
    this.created$ = this.store.select(selectSuccessfulSupplierCreation);
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
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      address: new FormControl('', Validators.required),
      status: new FormControl(StatusEnum.Active)
    });
  }

  handleSubmit() {
    if (!this.supplierForm.valid) {
      return;
    }

    this.store.dispatch(SuppliersActions.createSupplier({ supplier: this.supplierForm.value }));
  }

  handleReset() {
    this.creationSuccess = false;
    this.supplierForm = this.createFormGroup();
  }
}
