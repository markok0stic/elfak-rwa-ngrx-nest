import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from '../../models/category/category.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { editCategory } from '../../store/categories/categories.actions'

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {
  category$: Observable<CategoryModel | null>;
  categoryForm: FormGroup | null;
  sectionTitle: string;
  private categorySubject = new BehaviorSubject<CategoryModel | null>(null);

  @Input()
  set category(value: CategoryModel | null) {
    this.categorySubject.next(value);
  }
  constructor(private store: Store<AppState>, private _formBuilder: FormBuilder) {
    this.categoryForm = null;
    this.category$ = of(null);
    this.sectionTitle = 'Category';
  }

  ngOnInit(): void {
    this.category$ = this.categorySubject.asObservable();

    this.category$.subscribe((user) => {
      if (user) {
        this.categoryForm = this.createFormGroup(user);
        this.categoryForm.disable();
      }
    });
  }
  createFormGroup(category: CategoryModel | null) {
    return this._formBuilder.group({
      id: new FormControl(category?.id, Validators.required),
      name: new FormControl(category?.name, Validators.required),
      description: new FormControl(category?.description)
    });
  }

  toggleEdit() {
    if (this.categoryForm) {
      if (this.categoryForm.disabled) {
        this.sectionTitle = 'Edit Category';
        this.categoryForm.enable();
      } else {
        this.sectionTitle = 'Category';
        this.categoryForm.disable();
      }
    }
  }

  handleEdit() {
    if (!this.categoryForm || this.categoryForm?.invalid)
      return;

    this.store.dispatch(editCategory({category:this.categoryForm.value}))
  }
}
