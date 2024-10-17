import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarTnePage } from './recuperar-tne.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarTnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarTnePageRoutingModule {}
