import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { E502Page } from './e502.page';

const routes: Routes = [
  {
    path: '',
    component: E502Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class E502PageRoutingModule {}
