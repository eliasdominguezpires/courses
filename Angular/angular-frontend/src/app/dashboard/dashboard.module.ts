import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLoyoutComponent } from './layouts/dashboard-loyout/dashboard-loyout.component';


@NgModule({
  declarations: [
    DashboardLoyoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
