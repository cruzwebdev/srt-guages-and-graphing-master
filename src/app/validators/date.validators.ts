import { AbstractControl, ValidatorFn } from '@angular/forms';
import { dateFromDateInputValue } from '../utils';

export function minDateValidator(control: AbstractControl, min: Date, prefix = ''): ValidatorFn {
  return () => {
    const date = dateFromDateInputValue(control.value);

    if (date < min) {
      return {
        [prefix ? `${prefix}TooSoon` : 'tooSoon'] : true,
      };
    }

    return {};
  };
}

export function maxDateValidator(control: AbstractControl, max: Date, prefix = ''): ValidatorFn {
  return () => {
    const date = dateFromDateInputValue(control.value);

    if (date > max) {
      return {
        [prefix ? `${prefix}TooLate` : 'tooLate']: true,
      };
    }

    return {};
  }
}

export function startAfterEnd(start: AbstractControl, end: AbstractControl): ValidatorFn {
  return () => {
    const startDate = dateFromDateInputValue(start.value);
    const endDate = dateFromDateInputValue(end.value);

    if (startDate > endDate) {
      return {
        startAfterEnd: true,
      };
    }

    return {};
  };
}

export function withinRange(start: AbstractControl, end: AbstractControl, range: number): ValidatorFn {
  return () => {
    const startDate = dateFromDateInputValue(start.value);

    const endDate = dateFromDateInputValue(end.value);
    endDate.setDate(endDate.getDate() - range);

    if (endDate > startDate) {
      return {
        notWithinRange: true,
      };
    }

    return {};
  };
}

export function equalDates(start: AbstractControl, end: AbstractControl): ValidatorFn {
  return () => {
    const startDate = dateFromDateInputValue(start.value).getTime();
    const endDate = dateFromDateInputValue(end.value).getTime();

    if (startDate === endDate) {
      return {
        datesEqual: true,
      };
    }

    return {};
  };
}
