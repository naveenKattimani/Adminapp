import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { DpersonsComponent } from './dpersons/dpersons.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: 'login', 
    component: LoginComponent ,
    
  },
  { path: 'home', 
    component: HomeComponent 
  },
  {
    path: 'orders',
    component: OrdersComponent
  }
  ,
  {
    path: 'dpersons',
    component: DpersonsComponent
  }
];