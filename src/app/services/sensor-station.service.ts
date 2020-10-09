import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISensorStationData } from '../types';
import {
  updateValuesInHistoricalArray,
  generateRandomNumberBetweenRangeUsingHistory,
  getRandomNumberBetweenRange,
  getToday,
} from '../utils';

const maxWindSpeed = 30;
const maxWaveHeight = 15;
const maxWavePeriod = 30;
const maxSpeed = 50;
export const maxHistoricalDataDays = 1095;

export interface IHistoricalData {
  wind: IHistoricalDataPoint[];
  gust: IHistoricalDataPoint[];
  waveHeight: IHistoricalDataPoint[];
  currentSpeed: IHistoricalDataPoint[];
  pressure: IHistoricalDataPoint[];
}

export interface IHistoricalDataPoint {
  t: Date;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class SensorStationService {
  public currentSensorStationData$ = new BehaviorSubject<ISensorStationData | null>(null);

  private currentSensorStationData: ISensorStationData;

  private historicalData: IHistoricalData;

  constructor() {
    this.generateHistoricalData();
    this.setCurrentSensorStationData();

    setInterval(this.setCurrentSensorStationData.bind(this), 5000);
  }

  public getHistoricalData(startDate: Date, endDate: Date): IHistoricalData {
    return {
      wind: this.historicalData.wind.filter(item => item.t >= startDate && item.t <= endDate),
      gust: this.historicalData.gust.filter(item => item.t >= startDate && item.t <= endDate),
      waveHeight: this.historicalData.waveHeight.filter(item => item.t >= startDate && item.t <= endDate),
      currentSpeed: this.historicalData.currentSpeed.filter(item => item.t >= startDate && item.t <= endDate),
      pressure: this.historicalData.pressure.filter(item => item.t >= startDate && item.t <= endDate),
    };
  }

  private setCurrentSensorStationData(): void {
    if (!this.currentSensorStationData) {
      this.currentSensorStationData = {
        date: null,
        windDirection: (new Array(3)).fill(null),
        windSpeed: null,
        windGust: null,
        waveDirection: (new Array(3)).fill(null),
        waveHeight: null,
        wavePeriod: null,
        pressure: null,
        currentDirection: (new Array(3)).fill(null),
        currentSpeed: null,
      };
    }

    const windSpeed = generateRandomNumberBetweenRangeUsingHistory(0, maxWindSpeed, 5, this.currentSensorStationData.windSpeed, true);

    this.currentSensorStationData = {
      date: new Date(),
      windDirection: updateValuesInHistoricalArray(0, 359, 60, this.currentSensorStationData.windDirection as number[]),
      windSpeed,
      windGust: generateRandomNumberBetweenRangeUsingHistory( windSpeed, maxWindSpeed, 5, this.currentSensorStationData.windGust, true),
      waveDirection: updateValuesInHistoricalArray(0, 359, 60, this.currentSensorStationData.waveDirection as number[]),
      waveHeight: generateRandomNumberBetweenRangeUsingHistory(0, maxWaveHeight, 2, this.currentSensorStationData.waveHeight, true),
      wavePeriod: generateRandomNumberBetweenRangeUsingHistory(0, maxWavePeriod, 5, this.currentSensorStationData.wavePeriod),
      pressure: generateRandomNumberBetweenRangeUsingHistory(850, 1080, 20, this.currentSensorStationData.pressure),
      currentDirection: updateValuesInHistoricalArray(0, 359, 60, this.currentSensorStationData.currentDirection as number[]),
      currentSpeed: generateRandomNumberBetweenRangeUsingHistory(0, maxSpeed, 5, this.currentSensorStationData.currentSpeed, true),
    };

    this.currentSensorStationData$.next(this.currentSensorStationData);
  }

  private generateHistoricalData(): void {
    const result: IHistoricalData = {
      wind: [],
      gust: [],
      currentSpeed: [],
      pressure: [],
      waveHeight: [],
    };

    const startDate = getToday();
    startDate.setDate(startDate.getDate() - maxHistoricalDataDays);

    for (let i = 0; i <= maxHistoricalDataDays; i++) {
      const t = new Date(startDate);
      t.setDate(t.getDate() + i);

      result.wind.push({
        t,
        y: getRandomNumberBetweenRange(0, 30),
      });

      result.gust.push({
        t,
        y: getRandomNumberBetweenRange(0, 40),
      });

      result.waveHeight.push({
        t,
        y: getRandomNumberBetweenRange(0, 14),
      });

      result.currentSpeed.push({
        t,
        y: getRandomNumberBetweenRange(0, 12),
      });

      result.pressure.push({
        t,
        y: getRandomNumberBetweenRange(940, 1070),
      });
    }

    this.historicalData = result;
  }
}
