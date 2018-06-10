import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: ContentComponent,
    data: { contentId: 'home' }
  },
  { 
    path: 'contact', 
    component: ContentComponent,
    data: { contentId: 'contact' }
  },
  { 
    path: 'profile', 
    component: ContentComponent,
    data: { contentId: 'profile' }
  },
  { 
    path: 'team', 
    component: ContentComponent,
    data: { contentId: 'team' }
  },
  { 
    path: 'news', 
    component: ContentComponent,
    data: { contentId: 'news' }
  },
  { 
    path: 'impressum', 
    component: ContentComponent,
    data: { contentId: 'impressum' }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
