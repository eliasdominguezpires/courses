import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLoyoutComponent } from './layouts/dashboard-loyout/dashboard-loyout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLoyoutComponent,
    // children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
