import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'feed',
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'post/:post',
    component: PostDetailsComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'feed',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
