import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ModelModel } from '../../models/model/model.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { editModels } from '../../store/models/models.actions';
import { StatusEnum } from '@shared/enums/status.enum';

@Component({
  selector: 'app-models-edit',
  templateUrl: './models-edit.component.html',
  styleUrls: ['./models-edit.component.css']
})
export class ModelsEditComponent implements OnInit {
  model$: Observable<ModelModel | null>;
  modelForm: FormGroup | null;
  sectionTitle: string;
  private supplierSubject = new BehaviorSubject<ModelModel | null>(null);

  @Input()
  set model(value: ModelModel | null) {
    this.supplierSubject.next(value);
  }

  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder) {
    this.modelForm = null;
    this.model$ = of(null);
    this.sectionTitle = 'Model';
  }

  ngOnInit(): void {
    this.model$ = this.supplierSubject.asObservable();

    this.model$.subscribe((model) => {
      if (model) {
        this.modelForm = this.createFormGroup(model);
        this.modelForm.disable();
      }
    });
  }

  createFormGroup(model: ModelModel | null) {
    return this._formBuilder.group({
      id: new FormControl(model?.id, Validators.required),
      name: new FormControl(model?.name, Validators.required),
      status: new FormControl(model?.status === StatusEnum.Active, Validators.required),
    });
  }

  toggleEdit() {
    if (this.modelForm) {
      if (this.modelForm.disabled) {
        this.sectionTitle = 'Edit Model';
        this.modelForm.enable();
      } else {
        this.sectionTitle = 'Model';
        this.modelForm.disable();
      }
    }
  }

  handleEdit() {
    if (!this.modelForm || this.modelForm.invalid)
      return;

    const formValue = { ...this.modelForm.value };
    formValue.status = formValue.status ? StatusEnum.Active : StatusEnum.Inactive;

    this.store.dispatch(editModels({ model: formValue }));
  }

  protected readonly StatusEnum = StatusEnum;
}
