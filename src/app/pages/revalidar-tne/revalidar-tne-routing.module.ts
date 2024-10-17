import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevalidarTnePage } from './revalidar-tne.page';

const routes: Routes = [
  {
    path: '',
    component: RevalidarTnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevalidarTnePageRoutingModule {}
