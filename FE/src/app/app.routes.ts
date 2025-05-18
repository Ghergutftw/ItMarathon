import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeMenuComponent} from './home-menu/home-menu.component';
import {homeMenuRoutes} from './home-menu/home-menu.routes';

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
    path: 'home-menu',
    component: HomeMenuComponent,
    children: homeMenuRoutes
  }
];

