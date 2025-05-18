import {Routes} from '@angular/router';
import {ConversationsComponent} from './conversations/conversations.component';
import {SettingsComponent} from './settings/settings.component';
import {HomeComponent} from './home/home.component';

export const homeMenuRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: "conversations",
    component: ConversationsComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  }
];
