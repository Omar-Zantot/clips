import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public modal: ModalService, public auth: AuthService) {}

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
