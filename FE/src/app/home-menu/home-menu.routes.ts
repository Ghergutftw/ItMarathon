import {Routes} from '@angular/router';
import {ConversationsComponent} from './conversations/conversations.component';
import {SettingsComponent} from './settings/settings.component';
import {RequestComponent} from './request/request.component';

export const homeMenuRoutes: Routes = [
  {
    path: '',
    redirectTo: 'conversations',
    pathMatch: 'full'
  },
  {
    path: 'request',
    component: RequestComponent,
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
