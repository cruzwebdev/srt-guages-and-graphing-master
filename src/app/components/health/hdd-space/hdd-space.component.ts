import { Component } from '@angular/core';
import { HealthService } from 'src/app/services/health.service';

@Component({
  selector: 'app-hdd-space',
  templateUrl: './hdd-space.component.html',
  styleUrls: ['./hdd-space.component.scss']
})
export class HddSpaceComponent {
  public os$ = this.healthService.OS_HDD$;
  public storage$ = this.healthService.Storage$;

  constructor(private healthService: HealthService) { }
}
