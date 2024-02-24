import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BrandModel } from '../../models/brand/brand.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { StatusEnum } from '@shared/enums/status.enum';
import { editBrands } from '../../store/brands/brands.actions';

@Component({
  selector: 'app-brands-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.css'],
})
export class BrandsEditComponent implements OnInit {
  brand$: Observable<BrandModel | null>;
  brandForm: FormGroup | null;
  sectionTitle: string;
  private supplierSubject = new BehaviorSubject<BrandModel | null>(null);

  @Input()
  set brand(value: BrandModel | null) {
    this.supplierSubject.next(value);
  }

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder) {
    this.brandForm = null;
    this.brand$ = of(null);
    this.sectionTitle = 'Brand';
  }

  ngOnInit(): void {
    this.brand$ = this.supplierSubject.asObservable();

    this.brand$.subscribe((brand) => {
      if (brand) {
        this.brandForm = this.createFormGroup(brand);
        this.brandForm.disable();
      }
    });
  }

  createFormGroup(brand: BrandModel | null) {
    return this._formBuilder.group({
      id: new FormControl(brand?.id, Validators.required),
      name: new FormControl(brand?.name, Validators.required),
      status: new FormControl(brand?.status === StatusEnum.Active, Validators.required),
    });
  }

  toggleEdit() {
    if (this.brandForm) {
      if (this.brandForm.disabled) {
        this.sectionTitle = 'Edit Brand';
        this.brandForm.enable();
      } else {
        this.sectionTitle = 'Brand';
        this.brandForm.disable();
      }
    }
  }

  handleEdit() {
    if (!this.brandForm || this.brandForm.invalid)
      return;

    const formValue = { ...this.brandForm.value };
    formValue.status = formValue.status ? StatusEnum.Active : StatusEnum.Inactive;

    this.store.dispatch(editBrands({ brand: formValue }));
  }

  protected readonly StatusEnum = StatusEnum;
}
