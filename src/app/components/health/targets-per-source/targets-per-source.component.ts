import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HealthService } from 'src/app/services/health.service';

@Component({
  selector: 'app-targets-per-source',
  templateUrl: './targets-per-source.component.html',
  styleUrls: ['./targets-per-source.component.scss']
})
export class TargetsPerSourceComponent implements OnInit {
  public sources$ = new BehaviorSubject<string[]>(null);
  public values$ = new BehaviorSubject<Array<number[]>>(null);

  private targetsPerSource$ = this.healthService.targetsPerSource$;

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.targetsPerSource$.subscribe(targetsPerSource => {
      this.sources$.next(targetsPerSource.map(item => item.sourceName));
      this.values$.next([targetsPerSource.map(item => item.numberOfTargets)]);
    });
  }
}
