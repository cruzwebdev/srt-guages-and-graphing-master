import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss']
})
export class ValidationErrorsComponent implements OnChanges {
  @Input() messages: { [key: string]: string };
  @Input() errors: ValidationErrors[];

  public errorMessages$ = new BehaviorSubject<string[]>([]);

  ngOnChanges() {
    const messages: string[] = [];

    this.errors.forEach(error => {
      if (error) {
        Object.keys(error).forEach(key => messages.push(this.messages[key]));
      }
    });

    this.errorMessages$.next(Array.from(new Set(messages)));
  }
}
