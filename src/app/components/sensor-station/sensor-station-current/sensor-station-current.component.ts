import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensorStationData } from 'src/app/types';

@Component({
  selector: 'app-sensor-station-current',
  templateUrl: './sensor-station-current.component.html',
  styleUrls: ['./sensor-station-current.component.scss']
})
export class SensorStationCurrentComponent {
  @Input() data$: Observable<ISensorStationData>;

  constructor() { }
}
