import {Routes} from '@angular/router';
import {ConversationsComponent} from './conversations/conversations.component';
import {SettingsComponent} from './settings/settings.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    component: HomeComponent,
    pathMatch: 'full'
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
