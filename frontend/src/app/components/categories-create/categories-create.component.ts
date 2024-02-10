import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as CategoriesActions from '../../store/categories/categories.actions';
import { Observable, of } from 'rxjs';
import {
  isCategoriesLoadingSelector,
  selectSuccessfulCategoryCreation,
} from '../../store/categories/categories.selectors';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css'],
})
export class CategoriesCreateComponent implements OnInit {
  categoryForm: FormGroup;
  $loading: Observable<boolean>;
  creationSuccess: boolean;
  created$: Observable<boolean | null>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.categoryForm = this.createFormGroup();
    this.$loading = this.store.select(isCategoriesLoadingSelector);
    this.creationSuccess = false;
    this.created$ = this.store.select(selectSuccessfulCategoryCreation);
  }

  ngOnInit(): void {
    this.created$.subscribe((success)=>{
      this.creationSuccess = !!success;
      if(success) {
        this.handleReset()
      }
    })
  }

  createFormGroup() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }
  handleSubmit() {
    if (!this.categoryForm.valid) {
      return;
    }

    this.store.dispatch(CategoriesActions.createCategory({ category: this.categoryForm.value }));
  }

  handleReset() {
    this.creationSuccess = false;
    this.categoryForm = this.createFormGroup();
  }
}
