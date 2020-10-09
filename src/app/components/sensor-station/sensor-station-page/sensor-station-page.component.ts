import { Component } from '@angular/core';
import { SensorStationService } from 'src/app/services/sensor-station.service';

@Component({
  selector: 'app-sensor-station-page',
  templateUrl: './sensor-station-page.component.html',
  styleUrls: ['./sensor-station-page.component.scss']
})
export class SensorStationPageComponent {
  public currentData$ = this.sensorStationService.currentSensorStationData$;

  constructor(private sensorStationService: SensorStationService) { }
}
