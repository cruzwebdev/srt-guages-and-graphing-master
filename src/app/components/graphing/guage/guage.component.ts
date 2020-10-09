import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';
import { Colors } from 'src/app/enums';

@Component({
  selector: 'app-guage',
  templateUrl: './guage.component.html',
  styleUrls: ['./guage.component.scss']
})
export class GuageComponent implements OnInit {
  @Input() value$: Observable<number>;

  @Input() unit: string;

  @ViewChild('canvas') canvas: ElementRef;

  private chart: Chart;

  ngOnInit() {
    this.value$.subscribe(value => this.updateChart(value));
  }

  private updateChart(value: number) {
    const data = [value, 100 - value];

    if (this.chart) {
      this.chart.data.datasets[0].data = data;

      this.chart.update();
    } else {
      this.initialiseChart(data);
    }
  }

  private initialiseChart(data: number[]): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data,
            backgroundColor: [
              Colors.Orange,
              Colors.Text,
            ],
            borderWidth: 6,
            borderColor: Colors.Background,
          }
        ]
      },
      options: {
        aspectRatio: 1,
        legend: { display: false },
        tooltips: { enabled: false },
        hover: { mode: null }
      }
    });
  }
}
