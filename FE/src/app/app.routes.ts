import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeMenuComponent} from './home-menu/home-menu.component';
import {homeMenuRoutes} from './home-menu/home-menu.routes';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'home-menu',
    component: HomeMenuComponent,
    children: homeMenuRoutes
  }
];

