import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';
import { Colors } from 'src/app/enums';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() values$: Observable<Array<number[] | null[]>>;
  @Input() xAxisType: Chart.ScaleType = 'linear';
  @Input() colors: Colors[] = [Colors.Orange];
  @Input() suggestedMin = 0;
  @Input() suggestedMax: number;

  @ViewChild('canvas') canvas: ElementRef;

  private chart: Chart;
  private values: Array<number[] | null[]>;

  constructor() { }

  ngOnInit() {
    this.values$.subscribe(values => {
      this.values = values;

      this.updateChart();
    });
  }

  private updateChart(): void {
    if (this.values) {
      if (this.chart) {
        this.values.forEach((data, index) => {
          const dataset = this.chart.data.datasets[index];

          dataset.data = data;
        });

        this.chart.update();
      } else {
        this.initialiseChart();
      }
    }
  }

  private initialiseChart(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: this.values.map((data, index) => ({
          data,
          fill: false,
          pointRadius: 0,
          borderWidth: 3,
          lineTension: 0,
          borderColor: this.colors[index],
        })),
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          xAxes: [
            {
              type: this.xAxisType,
              time: {
                displayFormats: {
                  day: 'D MMM'
                },
                unit: 'day',
              },
              gridLines: {
                display: false,
                drawTicks: false,
                color: Colors.Text,
              },
              ticks: {
                fontSize: 12,
                fontColor: Colors.Text,
                padding: 10,
              }
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                drawTicks: false,
                color: Colors.Text,
              },
              ticks: {
                fontSize: 12,
                fontColor: Colors.Text,
                padding: 10,
                suggestedMin: this.suggestedMin,
                suggestedMax: this.suggestedMax,
              }
            }
          ],
        },
      },
    });
  }
}
