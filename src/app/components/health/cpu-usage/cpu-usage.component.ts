import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/services/health.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cpu-usage',
  templateUrl: './cpu-usage.component.html',
  styleUrls: ['./cpu-usage.component.scss']
})
export class CpuUsageComponent implements OnInit {
  public CPUUsage$ = this.healthService.CPUUsage$;
  public currentUsage$ = new BehaviorSubject<number>(null);

  constructor(private healthService: HealthService) { }

  ngOnInit() {
    this.CPUUsage$.subscribe(values => {
      const nullIndex = values.indexOf(null);

      if (nullIndex === -1) {
        this.currentUsage$.next(values[values.length - 1]);
      } else if (nullIndex > 0) {
        this.currentUsage$.next(values[nullIndex - 1]);
      }
    });
  }

}
