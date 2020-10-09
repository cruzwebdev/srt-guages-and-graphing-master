import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

import { getToday, dateFromDateInputValue } from 'src/app/utils';
import {
  maxHistoricalDataDays,
  SensorStationService,
  IHistoricalData,
  IHistoricalDataPoint,
} from 'src/app/services/sensor-station.service';

import { minDateValidator, maxDateValidator, startAfterEnd, withinRange, compareValidator, equalDates } from 'src/app/validators';
import { Colors } from 'src/app/enums';

@Component({
  selector: 'app-sensor-station-history',
  templateUrl: './sensor-station-history.component.html',
  styleUrls: ['./sensor-station-history.component.scss']
})
export class SensorStationHistoryComponent implements OnInit {
  public readonly maxDate = getToday();
  public readonly minDate: Date;
  public readonly Colors = Colors;

  public form: FormGroup;
  public startDate: FormControl;
  public endDate: FormControl;

  public windValues$ = new BehaviorSubject<Array<IHistoricalDataPoint[]>>(null);
  public waveHeightValues$ = new BehaviorSubject<Array<IHistoricalDataPoint[]>>(null);
  public currentSpeedValues$ = new BehaviorSubject<Array<IHistoricalDataPoint[]>>(null);
  public pressureValues$ = new BehaviorSubject<Array<IHistoricalDataPoint[]>>(null);

  constructor(private sensorStationService: SensorStationService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    const minDate = getToday();
    minDate.setDate(minDate.getDate() - maxHistoricalDataDays);

    const startDate = getToday();
    startDate.setDate(startDate.getDate() - 10);

    this.startDate = new FormControl(moment(startDate).format('YYYY-MM-DD'));
    this.endDate = new FormControl(moment(getToday()).format('YYYY-MM-DD'));

    this.startDate.setValidators([
      minDateValidator(this.startDate, this.minDate, 'startDate'),
      maxDateValidator(this.startDate, this.maxDate, 'startDate'),
      compareValidator(this.endDate, startAfterEnd(this.startDate, this.endDate)),
      compareValidator(this.endDate, withinRange(this.startDate, this.endDate, 10)),
      compareValidator(this.endDate, equalDates(this.startDate, this.endDate)),
    ]);

    this.endDate.setValidators([
      minDateValidator(this.endDate, this.minDate, 'endDate'),
      maxDateValidator(this.endDate, this.maxDate, 'endDate'),
      compareValidator(this.startDate, startAfterEnd(this.startDate, this.endDate)),
      compareValidator(this.startDate, withinRange(this.startDate, this.endDate, 10)),
      compareValidator(this.startDate, equalDates(this.startDate, this.endDate)),
    ]);

    this.form = this.formBuilder.group({
      startDate: this.startDate,
      endDate: this.endDate,
    });

    this.getData();
    this.form.valueChanges.subscribe(this.onValueChange.bind(this));
  }

  public setValidationMessages(messages: { [key: string]: string }): { [key: string]: string } {
    Object.keys(messages).forEach(key => {
      messages[key] = messages[key].replace(/{minDate}/g, moment(this.minDate).format('DD/MM/YYYY'));
    });

    return messages;
  }

  private onValueChange(): void {
    if (this.form.valid) {
      this.getData();
    }
  }

  private getData(): void {
    const startDate = dateFromDateInputValue(this.startDate.value);
    const endDate = dateFromDateInputValue(this.endDate.value);
    const data = this.sensorStationService.getHistoricalData(startDate, endDate);

    this.updateValues(data);
  }

  private updateValues(data: IHistoricalData): void {
    this.windValues$.next([data.wind, data.gust]);
    this.waveHeightValues$.next([data.waveHeight]);
    this.currentSpeedValues$.next([data.currentSpeed]);
    this.pressureValues$.next([data.pressure]);
  }
}
