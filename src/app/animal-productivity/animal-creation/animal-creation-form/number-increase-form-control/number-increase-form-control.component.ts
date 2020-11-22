import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-number-increase-form-control',
  templateUrl: './number-increase-form-control.component.html',
  styleUrls: ['./number-increase-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberIncreaseFormControlComponent,
      multi: true,
    },
  ],
})
export class NumberIncreaseFormControlComponent
  implements ControlValueAccessor {
  @Input()
  maxValue: number;

  @Input()
  minValue: number;

  value: number;

  onChangeHandler: (value: number) => void;
  onTouchHandler: () => void;

  get cannotBeDecreased(): boolean {
    return this.value === this.minValue;
  }

  get cannotBeIncreased(): boolean {
    return this.value === this.maxValue;
  }

  increaseValue() {
    this.value++;
    this.onChange(this.value);
  }

  decreaseValue() {
    this.value--;
    this.onChange(this.value);
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeHandler = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchHandler = fn;
  }

  onChange(value: number) {
    this.onChangeHandler(value);
  }

  onTouched() {
    this.onTouchHandler();
  }
}

@NgModule({
  declarations: [NumberIncreaseFormControlComponent],
  exports: [NumberIncreaseFormControlComponent],
  imports: [CommonModule, FormsModule],
})
export class NumberIncreaseFormControlComponentModule {}
