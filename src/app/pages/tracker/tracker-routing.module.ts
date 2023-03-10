import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TrackerPage } from './tracker.page';


const routes: Routes = [
  {
    path: '',
    component: TrackerPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrackerPageRoutingModule {}
