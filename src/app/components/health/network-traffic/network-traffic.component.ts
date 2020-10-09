import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HealthService } from 'src/app/services/health.service';
import * as Chart from 'chart.js';

import { Colors } from 'src/app/enums';

@Component({
  selector: 'app-network-traffic',
  templateUrl: './network-traffic.component.html',
  styleUrls: ['./network-traffic.component.scss']
})
export class NetworkTrafficComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;

  private network$ = this.healthService.network$;

  private chart: Chart;

  constructor(private healthService: HealthService) { }

  ngOnInit() {
    this.network$.subscribe(values => this.updateChart(values));
  }

  private updateChart(values): void {
    if (this.chart) {
      this.chart.data.datasets.forEach((dataset, index) => {
        dataset.data = values[index].map(value => value === null ? null : value / 10);

        this.chart.update();
      });
    } else {
      this.initialiseChart(values);
    }
  }

  private initialiseChart(values): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: (new Array(values[0].length)).fill(''),
        datasets: [
          {
            data: values[0],
            borderColor: Colors.Orange,
            backgroundColor: Colors.Transparent,
            pointRadius: 0,
            borderWidth: 2,
            lineTension: 0,
          },
          {
            data: values[1],
            borderColor: Colors.Orange,
            borderDash: [4, 4],
            backgroundColor: Colors.Transparent,
            pointRadius: 0,
            borderWidth: 2,
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
                display: false,
                drawTicks: false,
                color: Colors.Text,
              },
              ticks: {
                display: false,
              },
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Mbps',
                fontColor: Colors.Text,
              },
              gridLines: {
                display: false,
                drawTicks: false,
                color: Colors.Text,
              },
              ticks: {
                min: 0,
                suggestedMax: 2,
                fontColor: Colors.Text,
                stepSize: 0.5,
                padding: 10,
              }
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
