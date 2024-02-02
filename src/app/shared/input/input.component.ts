import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';

  getErrorMessage(control: FormControl) {
    if (control.errors?.['required']) {
      return 'Field is required';
    } else if (control.errors?.['email']) {
      return 'You must enter a valid email.';
    } else if (control.errors?.['min']) {
      return 'Value too low';
    } else if (control.errors?.['max']) {
      return 'Value too high';
    } else if (control.errors?.['minlength']) {
      return `The value you entered is ${
        control.getError('minlength')['actualLength']
      } characters long. It should be at least ${
        control.errors?.['minlength'].requiredLength
      } characters long.`;
    } else {
      return '';
    }
  }
}
