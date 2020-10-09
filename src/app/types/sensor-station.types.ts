export interface ISensorStationData {
  date: Date;
  windDirection: number | number[];
  windSpeed: number;
  windGust: number;
  waveDirection: number | number[];
  waveHeight: number;
  wavePeriod: number;
  pressure: number;
  currentDirection: number | number[];
  currentSpeed: number;
}
