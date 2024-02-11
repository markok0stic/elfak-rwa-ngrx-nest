import { Component, Input, OnInit } from '@angular/core';
import { SupplierModel } from '../../models/supplier/supplier.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { editSupplier } from '../../store/suppliers/suppliers.actions';
import { StatusEnum } from '@shared/enums/status.enum';

@Component({
  selector: 'app-suppliers-edit',
  templateUrl: './suppliers-edit.component.html',
  styleUrls: ['./suppliers-edit.component.css']
})
export class SuppliersEditComponent implements OnInit {
  supplier$: Observable<SupplierModel | null>;
  supplierForm: FormGroup | null;
  sectionTitle: string;
  private supplierSubject = new BehaviorSubject<SupplierModel | null>(null);

  @Input()
  set supplier(value: SupplierModel | null) {
    this.supplierSubject.next(value);
  }

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder) {
    this.supplierForm = null;
    this.supplier$ = of(null);
    this.sectionTitle = 'Supplier';
  }

  ngOnInit(): void {
    this.supplier$ = this.supplierSubject.asObservable();

    this.supplier$.subscribe((supplier) => {
      if (supplier) {
        this.supplierForm = this.createFormGroup(supplier);
        this.supplierForm.disable();
      }
    });
  }

  createFormGroup(supplier: SupplierModel | null) {
    console.log(supplier?.status)
    return this._formBuilder.group({
      id: new FormControl(supplier?.id, Validators.required),
      name: new FormControl(supplier?.name, Validators.required),
      mobile: new FormControl(supplier?.mobile, Validators.required),
      address: new FormControl(supplier?.address, Validators.required),
      status: new FormControl(supplier?.status === StatusEnum.Active, Validators.required)
    });
  }

  toggleEdit() {
    if (this.supplierForm) {
      if (this.supplierForm.disabled) {
        this.sectionTitle = 'Edit Supplier';
        this.supplierForm.enable();
      } else {
        this.sectionTitle = 'Supplier';
        this.supplierForm.disable();
      }
    }
  }

  handleEdit() {
    if (!this.supplierForm || this.supplierForm.invalid)
      return;

    const formValue = { ...this.supplierForm.value };
    formValue.status = formValue.status ? StatusEnum.Active : StatusEnum.Inactive;

    this.store.dispatch(editSupplier({supplier: formValue}));
  }

  protected readonly StatusEnum = StatusEnum;
}
