import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Colors } from 'src/app/enums';

interface IDialPreviousValue {
  angle?: number;
  styles?: { [key: string]: string };
  path?: string;
  fill?: string;
}

interface IDialMarker {
  value: number;
  containerStyles: { [key: string]: string };
  valueStyles: { [key: string]: string };
}

const dialMaxAngle = 220;

@Component({
  selector: 'app-dial',
  templateUrl: './dial.component.html',
  styleUrls: ['./dial.component.scss']
})
export class DialComponent implements OnChanges {
  @Input() public type: 'compass' | 'dial';
  @Input() public unit: string;
  @Input() private suggestedMin = 0;
  @Input() private suggestedMax: number;
  @Input() private numberOfMarkers = 11;
  @Input() private halfMarkersPerMarker = 1;
  @Input() private value: number | number[];

  public displayValue: number;
  public previousValues: IDialPreviousValue[] = [{ fill: 'transparent' }, { fill: 'transparent' }];
  public dialStyles: { [key: string]: string };
  public markers: IDialMarker[] = [];
  public halfMarkers: { [key: string]: string }[] = [];

  private minValue: number;
  private maxValue: number;
  private maxRotation: number;
  private startAngle: number;
  private minValueHistory: number[] = [];
  private maxValueHistory: number[] = [];
  private previousHistoricalArrowOrder = [0, 1];

  ngOnChanges(changes: SimpleChanges) {
    if (this.didChange(changes.value)) {
      setTimeout(() => this.updateDisplayValue());
    }

    if (this.didChange(changes.type)) {
      if (this.type === 'compass') {
        this.unit = '°';
        this.minValue = this.suggestedMin;
        this.maxValue = 360;
        this.maxRotation = 360;
        this.startAngle = 0;
      } else {
        this.minValue = this.suggestedMin;
        this.maxValue = this.suggestedMax;
        this.maxRotation = dialMaxAngle;
        this.startAngle = this.maxRotation / -2;
        setTimeout(() => this.drawDialMarkers());
      }
    }
  }

  private didChange(change: SimpleChange): boolean {
    return change && change.previousValue !== change.currentValue;
  }

  private updateDisplayValue(): void {
    if (Array.isArray(this.value)) {
      const nullIndex = this.value.indexOf(null);
      const displayValueIndex = nullIndex === -1 ? 2 : nullIndex - 1;

      this.displayValue = this.value[displayValueIndex];

      this.previousHistoricalArrowOrder.reverse();

      if (displayValueIndex > 0) {
        const previousValue1 = this.value[displayValueIndex - 1] ;


        this.setHistoricalArrow(this.displayValue, previousValue1, this.previousHistoricalArrowOrder[0]);

        if (displayValueIndex > 1) {
          const previousValue2 = this.value[displayValueIndex - 2];

          this.setHistoricalArrow(previousValue1, previousValue2, this.previousHistoricalArrowOrder[1]);
        }
      }

    } else {
      this.displayValue = this.value;

      this.setMaxValue();
      this.setMinValue();
    }

    const angle = ((this.displayValue - this.minValue) / (this.maxValue - this.minValue) * this.maxRotation) + this.startAngle;

    this.dialStyles = {
      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
    };
  }

  private setHistoricalArrow(a: number, b: number, index: number): void {
    if (a !== null && b !== null && a !== b) {
      const diff = a - b;
      const angle = Math.abs(diff);
      const styles = {
        transform: `translate(-50%, -50%) rotate(${a > b ? b : a}deg)`
      };

      this.previousValues[index] = {
        angle,
        styles,
        path: this.calculateTriangle(angle),
        fill: this.previousHistoricalArrowOrder[index] === 0 ? Colors.TranslucentGrey : Colors.VeryTranslucentGrey,
      };
    } else {
      this.previousValues[index] = {};
    }
  }

  private calculateTriangle(angle: number): string {
    const radius = 75;
    const angleCalc = (angle > 180) ? 360 - angle : angle;
    const angleRadians = angleCalc * Math.PI / 180;
    const z = Math.sqrt(2 * radius * radius - (2 * radius * radius * Math.cos(angleRadians)));
    let x: number;

    if (angleCalc <= 90) {
      x = radius * Math.sin(angleRadians);
    } else {
      x = radius * Math.sin((180 - angleCalc) * Math.PI / 180);
    }

    const Y = Math.sqrt(z * z - x * x);
    const X = angle <= 180 ? radius + x : radius - x;

    return `M${radius},${radius} L${radius},0 A${radius},${radius} 1 0,1 ${X}, ${Y} z`;
  }

  private drawDialMarkers(): void {
    const range = this.maxValue - this.minValue;
    const numberOfSteps = (this.numberOfMarkers - 1);
    const valueStep = range / numberOfSteps;
    const angleStep = this.maxRotation / numberOfSteps;
    const halfMarkerAngleStep = angleStep / (this.halfMarkersPerMarker + 1);

    this.markers = new Array(this.numberOfMarkers).fill(null).map((v, index) => {

      const value = Math.round(this.minValue + (index * valueStep));
      const rotation = this.startAngle + (index * angleStep);

      let valueTop: number;
      let topMultiplier: number;

      switch (value.toString().length) {
        case 4: {
          valueTop = 1.4;
          topMultiplier = .03;
          break;
        }
        case 3: {
          valueTop = 1.1;
          topMultiplier = .025;
          break;
        }
        case 2: {
          valueTop = 1.05;
          topMultiplier = .01;
          break;
        }
        default: {
          valueTop = 0.9;
          topMultiplier = .005;
        }
      }

      valueTop += Math.abs((this.numberOfMarkers / 2) - index) * topMultiplier;

      return {
        value,
        containerStyles: {
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        },
        valueStyles: {
          transform: `translateX(-50%) rotate(${-rotation}deg)`,
          top: `${valueTop}em`
        },
      };
    });

    let skipStep = -1;

    this.halfMarkers = new Array((this.numberOfMarkers - 1) * this.halfMarkersPerMarker).fill(null).map((m, index) => {
      if (index % this.halfMarkersPerMarker === 0) {
        skipStep++;
      }

      const rotation = this.startAngle + ((index + 1 + skipStep) * halfMarkerAngleStep);

      return {
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      };
    });
  }

  private setMaxValue(): void {
    if (this.maxValueHistory.length === 10) {
      this.maxValueHistory.shift();
    }

    this.maxValueHistory.push(Math.ceil(this.displayValue));

    const newMax = Math.max(...this.maxValueHistory, this.suggestedMax);

    if (this.maxValue !== newMax) {
      this.maxValue = newMax;

      this.drawDialMarkers();
    }
  }

  private setMinValue(): void {
    if (this.minValueHistory.length === 10) {
      this.minValueHistory.shift();
    }

    this.minValueHistory.push(Math.ceil(this.displayValue));

    const newMin = Math.min(...this.maxValueHistory, this.suggestedMin);

    if (this.minValue !== newMin) {
      this.minValue = newMin;

      this.drawDialMarkers();
    }
  }
}
