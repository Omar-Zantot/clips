import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // providers: [ModalService], component level
})
export class ModalComponent {
  constructor(public modal: ModalService) {}

  closeModal() {
    this.modal.toggleModal();
  }
}

/**
 * Previously, we would pass on the event, object to the function by passing on
 * this object.We could call the prevent default function from preventing the default behavior.
 * However, we're going to be applying our click listeners to div tags.
 * Clicks on div tags will not cause the browser to redirect the user to
 * a different page.Therefore, it's safe not to call this method.
 * We can save ourselves the time of calling B prevent default method.
 */
