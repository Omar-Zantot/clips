import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private afauth: AngularFireAuth
  ) {}

  /**
   * - run the $event.preventDefault() function that prevent the default
   * behavior of the browser by calling this method.
   * - toggle the modal window by calling togglemodal() method form the modalService
   */
  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

  // Signing out of Firebase isn't a synchronous operator
  async logout($event: Event) {
    $event.preventDefault();
    await this.afauth.signOut();
  }
}
