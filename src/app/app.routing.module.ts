import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Route1Component } from './route1/route1.component';
import { Route2Component } from './route2/route2.component';

const routes: Routes = [
  {
    path: 'route1',
    component: Route1Component,
  },
  {
    path: 'route2',
    component: Route2Component,
  },
  {
    path: '**',
    redirectTo: '/route1',
  },
  {
    path: '',
    redirectTo: '/route1',
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [Route1Component, Route2Component],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
