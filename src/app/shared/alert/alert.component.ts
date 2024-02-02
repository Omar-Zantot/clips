import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() color = 'blue';

  get bgColor() {
    return `bg-${this.color}-400`;
  }
}

/**
 * The get keyword allows us to access the value returned by
 * the function as a property.It allows us to create properties
 * with extra logic before the property is set
 * */
