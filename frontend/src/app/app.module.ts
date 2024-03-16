import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppState } from './app.state';
import { CurrentUserEffects } from './store/current-user/current.user.effects';
import { InterceptorService } from './app.interceptor';
import { currentUserReducers } from './store/current-user/current.user.reducers';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatLineModule, MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productReducers } from './store/product/product.reducers';
import { ProductEffects } from './store/product/product.effects';
import { orderReducers } from './store/order/order.reducers';
import { OrderEffects } from './store/order/order.effects';
import { customerReducers } from './store/customer/customer.reducers';
import { CustomerEffects } from './store/customer/customer.effects';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/_layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './components/_navigation/navigation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgOptimizedImage } from '@angular/common';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { UsersComponent } from './components/users/users.component';
import { TableComponent } from './components/_table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { usersReducers } from './store/users/users.reducers';
import { UsersEffects } from './store/users/users.effects';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { categoriesReducers } from './store/categories/categories.reducers';
import { CategoriesEffects } from './store/categories/categories.effects';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesCreateComponent } from './components/categories-create/categories-create.component';
import { CategoriesEditComponent } from './components/categories-edit/categories-edit.component';
import { suppliersReducers } from './store/suppliers/suppliers.reducers';
import { SuppliersEffects } from './store/suppliers/suppliers.effects';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SuppliersCreateComponent } from './components/suppliers-create/suppliers-create.component';
import { SuppliersEditComponent } from './components/suppliers-edit/suppliers-edit.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { brandsReducers } from './store/brands/brands.reducers';
import { BrandsEffects } from './store/brands/brands.effects';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandsCreateComponent } from './components/brands-create/brands-create.component';
import { BrandsEditComponent } from './components/brands-edit/brands-edit.component';
import { modelsReducers } from './store/models/models.reducers';
import { ModelsComponent } from './components/models/models.component';
import { ModelsCreateComponent } from './components/models-create/models-create.component';
import { ModelsEditComponent } from './components/models-edit/models-edit.component';
import { ModelsEffects } from './store/models/models.effects';
import { ProductsComponent } from './components/products/products.component';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { CamelCaseToTitlePipe } from './services/custom-pipes/CamelCaseToTitlePipe';

@NgModule({
  declarations: [
    CamelCaseToTitlePipe,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LayoutComponent,
    NavigationComponent,
    ViewProfileComponent,
    UsersComponent,
    TableComponent,
    TableComponent,
    ConfirmDialogComponent,
    CategoriesComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent,
    SuppliersComponent,
    SuppliersCreateComponent,
    SuppliersEditComponent,
    BrandsComponent,
    BrandsCreateComponent,
    BrandsEditComponent,
    ModelsComponent,
    ModelsCreateComponent,
    ModelsEditComponent,
    ProductsComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot<AppState>({
      currentUser: currentUserReducers,
      products: productReducers,
      order: orderReducers,
      customer: customerReducers,
      users: usersReducers,
      categories: categoriesReducers,
      suppliers: suppliersReducers,
      brands: brandsReducers,
      models: modelsReducers
    }),
    EffectsModule.forRoot([
      CurrentUserEffects,
      ProductEffects,
      OrderEffects,
      CustomerEffects,
      UsersEffects,
      CategoriesEffects,
      SuppliersEffects,
      BrandsEffects,
      ModelsEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatStepperModule,
    MatSelectModule,
    DragDropModule,
    MatRippleModule,
    MatChipsModule,
    MatBadgeModule,
    DialogModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatLineModule,
    NgOptimizedImage,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
