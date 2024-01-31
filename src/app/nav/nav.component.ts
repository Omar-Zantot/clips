import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public modal: ModalService) {}

  /**
   * - run the $event.preventDefault() function that prevent the default
   * behavior of the browser by calling this method.
   * - toggle the modal window by calling togglemodal() method form the modalService
   */
  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }
}
