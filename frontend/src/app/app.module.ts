import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppState} from "./app.state";
import {UserEffects} from "./store/user/user.effects";
import {InterceptorService} from "./app.interceptor";
import { userReducers } from './store/user/user.reducers';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatRippleModule} from "@angular/material/core";
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DialogModule} from "@angular/cdk/dialog";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {productReducers} from "./store/product/product.reducers";
import {ProductEffects} from "./store/product/product.effects";
import {orderReducers} from "./store/order/order.reducers";
import {OrderEffects} from "./store/order/order.effects";
import {customerReducers} from "./store/customer/customer.reducers";
import {CustomerEffects} from "./store/customer/customer.effects";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
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
      user: userReducers,
      product: productReducers,
      order: orderReducers,
      customer: customerReducers
    }),
    EffectsModule.forRoot([
      UserEffects,
      ProductEffects,
      OrderEffects,
      CustomerEffects
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
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
