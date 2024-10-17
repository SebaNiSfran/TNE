import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevalidarTnePageRoutingModule } from './revalidar-tne-routing.module';

import { RevalidarTnePage } from './revalidar-tne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevalidarTnePageRoutingModule
  ],
  declarations: [RevalidarTnePage]
})
export class RevalidarTnePageModule {}
