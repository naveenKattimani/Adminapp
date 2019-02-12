import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from '../app/router.config';
import { OrdersComponent } from './orders/orders.component';
import { DpersonsComponent } from './dpersons/dpersons.component';
import * as firebase from 'firebase';
import { AngularFireDatabaseModule,AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import {SelectModule} from 'ng2-select';
import { HttpClientModule } from '@angular/common/http';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder} from '@angular/forms';
firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    DpersonsComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule,RouterModule,FormsModule, ReactiveFormsModule,SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    SelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],  
  
})
export class AppModule { }
