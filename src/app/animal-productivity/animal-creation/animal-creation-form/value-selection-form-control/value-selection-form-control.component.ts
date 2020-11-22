import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-value-selection-form-control',
  templateUrl: './value-selection-form-control.component.html',
  styleUrls: ['./value-selection-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ValueSelectionFormControlComponent,
      multi: true,
    },
  ],
})
export class ValueSelectionFormControlComponent
  implements ControlValueAccessor {
  @Input()
  items: string[];

  value: string;

  onChangeHandler: (value: string) => void;
  onTouchHandler: () => void;

  isActive(item: string) {
    return this.value === item;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeHandler = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchHandler = fn;
  }

  onChange(value: string) {
    this.onChangeHandler(value);
  }

  onTouched() {
    this.onTouchHandler();
  }
}

@NgModule({
  declarations: [ValueSelectionFormControlComponent],
  exports: [ValueSelectionFormControlComponent],
  imports: [CommonModule, FormsModule],
})
export class ValueSelectionFormControlComponentModule {}
