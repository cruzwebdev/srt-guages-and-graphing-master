import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HealthService } from 'src/app/services/health.service';
import { Colors } from 'src/app/enums';

@Component({
  selector: 'app-targets-per-second',
  templateUrl: './targets-per-second.component.html',
  styleUrls: ['./targets-per-second.component.scss']
})
export class TargetsPerSecondComponent implements OnInit {
  public labels$ = new BehaviorSubject<number[]>(null);
  public targetsPerSecond$ = this.healthService.targetsPerSecond$;
  public Colors = Colors;

  constructor(private healthService: HealthService) { }

  ngOnInit() {
    this.targetsPerSecond$.subscribe(values => {
      this.labels$.next(values[0].map((item, index) => index));
    });
  }
}
