import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as Chart from 'chart.js';
import { Colors } from 'src/app/enums';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() values$: Observable<Array<number[] | null[]>>;
  @Input() labels$: Observable<Array<string | null>>;
  @Input() suggestedMax = 1000;
  @Input() colors: Colors[] = [Colors.Orange];

  @ViewChild('canvas') canvas: ElementRef;

  private chart: Chart;
  private values: Array<number[] | null[]>;
  private labels: Array<string | null>;

  ngOnInit() {
    this.values$.subscribe(values => {
      this.values = values;
      this.updateChart();
    });

    this.labels$.subscribe(labels => {
      this.labels = labels;
      this.updateChart();
    });
  }

  private updateChart(): void {
    if (this.labels && this.values) {
      if (this.chart) {
        this.values.forEach((data, index) => {
          const dataset = this.chart.data.datasets[index];

          dataset.data = data;
          dataset.backgroundColor = this.colors[index];
        });

        this.chart.data.labels = this.labels;

        const stacked = this.values.length > 0;

        this.chart.options.scales.xAxes[0].stacked = stacked;
        this.chart.options.scales.yAxes[0].stacked = stacked;

        this.chart.update();
      } else {
        this.initialiseChart();
      }
    }
  }

  private initialiseChart(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    const stacked = this.values.length > 0;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.values.map((data, index) => ({
          data,
          fill: false,
          borderWidth: 0,
          backgroundColor: this.colors[index],
        })),
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        hover: { mode: null },
        scales: {
          xAxes: [
            {
              stacked,
              gridLines: {
                display: false,
                drawTicks: false,
                color: Colors.Text,
              },
              ticks: {
                fontSize: 10,
                fontColor: Colors.Text,
                padding: 10,
              }
            }
          ],
          yAxes: [
            {
              stacked,
              gridLines: {
                display: false,
                drawTicks: false,
                color: Colors.Text,
              },
              ticks: {
                min: 0,
                suggestedMax: this.suggestedMax,
                fontColor: Colors.Text,
                padding: 10,
                stepSize: this.suggestedMax / 4,
              },
            },
          ],
        },
      }
    });
  }
}
