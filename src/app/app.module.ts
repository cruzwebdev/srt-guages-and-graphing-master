import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { AppRoutingModule } from './app-routing.module';

// Graphing
import { AppComponent } from './app.component';
import { GuageComponent } from './components/graphing/guage/guage.component';
import { AreaChartComponent } from './components/graphing/area-chart/area-chart.component';
import { BarChartComponent } from './components/graphing/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/graphing/line-chart/line-chart.component';
import { DialComponent } from './components/graphing/dial/dial.component';

// Health
import { CpuTempComponent } from './components/health/cpu-temp/cpu-temp.component';
import { CpuUsageComponent } from './components/health/cpu-usage/cpu-usage.component';
import { HddSpaceComponent } from './components/health/hdd-space/hdd-space.component';
import { NetworkTrafficComponent } from './components/health/network-traffic/network-traffic.component';
import { TargetsPerSourceComponent } from './components/health/targets-per-source/targets-per-source.component';
import { TargetsPerSecondComponent } from './components/health/targets-per-second/targets-per-second.component';
import { NetworkMapComponent } from './components/health/network-map/network-map.component';
import { SymbolsComponent } from './components/symbols/symbols.component';
import { HealthPageComponent } from './components/health/health-page/health-page.component';

// Sensor Station
import { SensorStationPageComponent } from './components/sensor-station/sensor-station-page/sensor-station-page.component';
import { SensorStationCurrentComponent } from './components/sensor-station/sensor-station-current/sensor-station-current.component';
import { SensorStationHistoryComponent } from './components/sensor-station/sensor-station-history/sensor-station-history.component';
import { ValidationErrorsComponent } from './components/forms/validation-errors/validation-errors.component';
import { HeaderComponent } from './components/shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    // Graphing
    GuageComponent,
    AreaChartComponent,
    BarChartComponent,
    LineChartComponent,
    DialComponent,

    // Health
    CpuTempComponent,
    CpuUsageComponent,
    HddSpaceComponent,
    NetworkTrafficComponent,
    TargetsPerSourceComponent,
    TargetsPerSecondComponent,
    NetworkMapComponent,
    SymbolsComponent,
    HealthPageComponent,

    // Sensor Station
    SensorStationPageComponent,
    SensorStationCurrentComponent,
    SensorStationHistoryComponent,
    ValidationErrorsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGraphModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
