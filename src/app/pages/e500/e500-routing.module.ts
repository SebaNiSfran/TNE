import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { E500Page } from './e500.page';

const routes: Routes = [
  {
    path: '',
    component: E500Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class E500PageRoutingModule {}
