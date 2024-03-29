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
import { MatLineModule, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductsComponent } from './components/products/products.component';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { CamelCaseToTitlePipe } from './services/custom-pipes/CamelCaseToTitlePipe';
import { saleReducers } from './store/sales/sale.reducers';
import { SaleEffects } from './store/sales/sale.effects';
import { SalesComponent } from './components/sales/sales.component';
import { SalesCreateComponent } from './components/sales-create/sales-create.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { dashboardReducers } from './store/dashboard/dashboard.reducers';
import { DashboardEffects } from './store/dashboard/dashboard.effects';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { DashboardTableComponent } from './components/dashboard-table/dashboard-table.component';

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
    ProductsComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    SalesComponent,
    SalesCreateComponent,
    ReportsComponent,
    DashboardCardComponent,
    DashboardTableComponent,
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
      users: usersReducers,
      categories: categoriesReducers,
      sales: saleReducers,
      dashboard: dashboardReducers
    }),
    EffectsModule.forRoot([
      CurrentUserEffects,
      ProductEffects,
      UsersEffects,
      CategoriesEffects,
      SaleEffects,
      DashboardEffects
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
})

export class AppModule {
}
