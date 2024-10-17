import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarTnePageRoutingModule } from './recuperar-tne-routing.module';

import { RecuperarTnePage } from './recuperar-tne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarTnePageRoutingModule
  ],
  declarations: [RecuperarTnePage]
})
export class RecuperarTnePageModule {}
