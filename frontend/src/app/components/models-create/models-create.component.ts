import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { StatusEnum } from '@shared/enums/status.enum';
import * as ModelsActions from '../../store/models/models.actions';
import { selectModelsLoading, selectSuccessfulModelCreation } from '../../store/models/models.selectors';

@Component({
  selector: 'app-models-create',
  templateUrl: './models-create.component.html',
  styleUrls: ['./models-create.component.css']
})
export class ModelsCreateComponent implements OnInit {
  modelForm: FormGroup;
  $loading: Observable<boolean>;
  creationSuccess: boolean;
  created$: Observable<boolean | null>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.modelForm = this.createFormGroup();
    this.$loading = this.store.select(selectModelsLoading);
    this.creationSuccess = false;
    this.created$ = this.store.select(selectSuccessfulModelCreation);
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
    if (!this.modelForm.valid) {
      return;
    }

    this.store.dispatch(ModelsActions.createModels({ model: this.modelForm.value }));
  }

  handleReset() {
    this.creationSuccess = false;
    this.modelForm = this.createFormGroup();
  }
}
