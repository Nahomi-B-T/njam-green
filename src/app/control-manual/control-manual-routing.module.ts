import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlManualPage } from './control-manual.page';

const routes: Routes = [
  {
    path: '',
    component: ControlManualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlManualPageRoutingModule {}
