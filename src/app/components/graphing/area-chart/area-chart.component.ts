import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';

import { Colors } from 'src/app/enums';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {
  @Input() value$: Observable<Array<number | null>>;

  @Input() aspectRatio = 1.6;
  @Input() minY = 0;
  @Input() maxY = 100;

  @ViewChild('canvas') canvas: ElementRef;

  private chart: Chart;

  ngOnInit() {

    this.value$.subscribe(data => this.updateChart(data));
  }

  private updateChart(data: number[]): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = data;

      this.chart.update();
    } else {
      this.initialiseChard(data);
    }
  }

  private initialiseChard(data: number[]): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: (new Array(data.length)).fill(''),
        datasets: [
          {
            data,
            borderColor: Colors.Orange,
            backgroundColor: Colors.TranslucentOrange,
            pointRadius: 0,
            borderWidth: 1,
            lineTension: 0,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        tooltips: { enabled: false },
        hover: { mode: null },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawTicks: false,
                color: Colors.LightBackground,
                zeroLineColor: Colors.Text,
              },
              ticks: {
                display: false,
              },
            }
          ],
          yAxes: [
            {
              gridLines: {
                drawTicks: false,
                drawBorder: false,
                color: Colors.LightBackground,
                zeroLineColor: Colors.Text,
              },
              ticks: {
                max: this.maxY,
                min: this.minY,
                fontColor: Colors.Text,
                padding: 10,
              },
            }
          ]
        },
        animation: {
          duration: 0,
        }
      }
    });
  }
}
