import { generateRandomNumberBetweenRangeUsingHistory } from './random-number-between-range-from-history.util';
import { getRandomNumberBetweenRange } from './random-number-between-range.util';

export function updateValuesInHistoricalArray(min: number, max: number, maximumVariance: number, previous: number[]): number[] {
  const firstNull = previous.indexOf(null);
  let previousValue;

  if (firstNull > 0) {
    previousValue = previous[firstNull - 1];
  } else if (firstNull === -1) {
    previousValue = previous[previous.length - 1];
  } else {
    getRandomNumberBetweenRange(min, max);
  }

  const newValue = generateRandomNumberBetweenRangeUsingHistory(min, max, maximumVariance, previousValue);

  const result = [...previous];

  if (firstNull === -1) {
    result.shift();
    result.push(newValue);
  } else {
    result[firstNull] = newValue;
  }

  return result;
}
