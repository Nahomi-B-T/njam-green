import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlManualPageRoutingModule } from './control-manual-routing.module';

import { ControlManualPage } from './control-manual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlManualPageRoutingModule
  ],
  //declarations: [ControlManualPage]
})
export class ControlManualPageModule {}
