import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/services/health.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cpu-temp',
  templateUrl: './cpu-temp.component.html',
  styleUrls: ['./cpu-temp.component.scss']
})
export class CpuTempComponent implements OnInit {
  public CPUTemp$ = this.healthService.CPUTemp$;
  public currentTemp$ = new BehaviorSubject<number>(null);

  constructor(private healthService: HealthService) { }

  ngOnInit() {
    this.CPUTemp$.subscribe(temps => {
      const nullIndex = temps.indexOf(null);

      if (nullIndex === -1) {
        this.currentTemp$.next(temps[temps.length - 1]);
      } else if (nullIndex > 0) {
        this.currentTemp$.next(temps[nullIndex - 1]);
      }
    });
  }

}
