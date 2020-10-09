import { getRandomNumberBetweenRange } from './random-number-between-range.util';

export function generateRandomNumberBetweenRangeUsingHistory(
  min: number,
  max: number,
  maxVariance: number,
  previous: number,
  createDecimal = false
): number {
  if (createDecimal) {
    if (previous) {
      previous *= 10;
    }

    min *= 10;
    max *= 10;
    maxVariance *= 10;
  }

  const varianceMin = previous ? Math.max(previous - maxVariance, min) : min;
  const varianceMax = previous ? Math.min(previous + maxVariance, max) : max;

  const result = getRandomNumberBetweenRange(varianceMin, varianceMax);

  return createDecimal ? result / 10 : result;
}
