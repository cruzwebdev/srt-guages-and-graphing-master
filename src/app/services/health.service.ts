import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getRandomNumberBetweenRange, updateValuesInHistoricalArray } from '../utils';
import { ISourceTargets } from '../types';

export const CPUUpdateFrequency = 5000;
export const CPUGraphDuration = 300000;
export const HDDUpdateFrequency = 5000;
export const NetworkUpdateFrequency = 1000;
export const NetworkGraphDuration = 300000;
export const TargetsPerSourceUpdateFrequency = 1000;
export const TargetsPerSecondUpdateFrequency = 1000;
export const TargetsPerSecondGraphDuration = 10000;

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  public CPUTemp$ = new BehaviorSubject<Array<number | null>>(null);
  public CPUUsage$ = new BehaviorSubject<Array<number | null>>(null);
  public OS_HDD$ = new BehaviorSubject<number>(null);
  public Storage$ = new BehaviorSubject<number>(null);
  public network$ = new BehaviorSubject<Array<Array<number | null>>>(null);
  public targetsPerSource$ = new BehaviorSubject<Array<ISourceTargets>>(null);
  public targetsPerSecond$ = new BehaviorSubject<Array<number[] | null>>(null);

  private CPUTemp: Array<number | null> = new Array(CPUGraphDuration / CPUUpdateFrequency).fill(null);
  private CPUUsage: Array<number | null> = new Array(CPUGraphDuration / CPUUpdateFrequency).fill(null);
  private networkTX: Array<number | null> = new Array(NetworkGraphDuration / NetworkUpdateFrequency).fill(null);
  private networkRX: Array<number | null> = new Array(NetworkGraphDuration / NetworkUpdateFrequency).fill(null);
  private targetsPerSource: Array<ISourceTargets | null>;
  private AISTargetsPerSecond: Array<number | null> = new Array(TargetsPerSecondGraphDuration / TargetsPerSecondUpdateFrequency).fill(null);
  // tslint:disable-next-line: max-line-length
  private RadarTargetsPerSecond: Array<number | null> = new Array(TargetsPerSecondGraphDuration / TargetsPerSecondUpdateFrequency).fill(null);

  constructor() {
    this.updateCPUTemp();
    this.updateCPUUsage();
    this.updateOS_HDD();
    this.updateStorage();
    this.updateNetwork();
    this.updateTargetsPerSource();
    this.updateTargetsPerSecond();

    setInterval(() => {
      this.updateCPUTemp();
      this.updateCPUUsage();
    }, CPUUpdateFrequency);

    setInterval(() => {
      this.updateOS_HDD();
      this.updateStorage();
    }, HDDUpdateFrequency);

    setInterval(() => this.updateNetwork(), NetworkUpdateFrequency);

    setInterval(() => this.updateTargetsPerSource(), TargetsPerSourceUpdateFrequency);

    setInterval(() => this.updateTargetsPerSecond(), TargetsPerSecondUpdateFrequency);
  }

  private updateCPUTemp(): void {
    this.CPUTemp = updateValuesInHistoricalArray(38, 80, 10, this.CPUTemp);

    this.CPUTemp$.next(this.CPUTemp);
  }

  private updateCPUUsage(): void {
    this.CPUUsage = updateValuesInHistoricalArray(2, 100, 10, this.CPUUsage);

    this.CPUUsage$.next(this.CPUUsage);
  }

  private updateOS_HDD(): void {
    this.OS_HDD$.next(25);
  }

  private updateStorage(): void {
    this.Storage$.next(75);
  }

  private updateNetwork(): void {
    this.networkTX = updateValuesInHistoricalArray(12, 24, 6, this.networkTX);
    this.networkRX = updateValuesInHistoricalArray(4, 18, 4, this.networkRX);

    this.network$.next([this.networkTX, this.networkRX]);
  }

  private updateTargetsPerSource(): void {
    if (this.targetsPerSource) {
      this.targetsPerSource = this.targetsPerSource.map(item => ({
        ...item,
        numberOfTargets: updateValuesInHistoricalArray(500, 900, 100, [item.numberOfTargets])[0]
      }));
    } else {
      this.targetsPerSource = new Array(8)
        .fill({
          sourceName: 'RFMC',
          numberOfTargets: null,
        } as ISourceTargets)
        .map((item, index) => ({
          sourceName: `${item.sourceName}${index + 1}`,
          numberOfTargets: getRandomNumberBetweenRange(500, 900),
        }));
    }

    this.targetsPerSource$.next(this.targetsPerSource);
  }

  private updateTargetsPerSecond(): void {
    this.AISTargetsPerSecond = updateValuesInHistoricalArray(500, 1000, 500, this.AISTargetsPerSecond);
    this.RadarTargetsPerSecond = updateValuesInHistoricalArray(1500, 3500, 500, this.RadarTargetsPerSecond);

    this.targetsPerSecond$.next([this.RadarTargetsPerSecond, this.AISTargetsPerSecond]);
  }
}
