import { Injectable } from '@angular/core';

@Injectable({
  /**
   * The service will be injectable from the root injector,
   * therefore it can be injected into any component
   * global level
   */
  providedIn: 'root',
})
export class ModalService {
  private visible = false;

  constructor() {}

  isModalOpen() {
    return this.visible;
  }

  toggleModal() {
    this.visible = !this.visible;
  }
  // ID system to keep single ton pattern 📓
  register(id: string) {}
}
