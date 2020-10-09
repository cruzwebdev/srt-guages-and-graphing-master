import { Routes, RouterModule, } from '@angular/router';
import { NgModule } from '@angular/core';

import { HealthPageComponent } from './components/health/health-page/health-page.component';
import { SensorStationPageComponent } from './components/sensor-station/sensor-station-page/sensor-station-page.component';

const routes: Routes = [
  {
    path: '',
    component: HealthPageComponent,
  },
  {
    path: 'sensor-station',
    component: SensorStationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
