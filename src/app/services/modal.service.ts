import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  /**
   * The service will be injectable from the root injector,
   * therefore it can be injected into any component
   * global level
   */
  providedIn: 'root',
})
export class ModalService {
  // private visible = false;
  private modals: IModal[] = [];

  constructor() {}

  // ID system to keep single ton pattern 📓
  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    });
  }

  /**
   * @param id
   * @returns boolean
   * - callback function to compare modals id then return visible value
   * - optional chaning If the find function does not return an object,
   * It will not attempt to access a property called visible.
   * - when we annotate the return value of the function to Boolean rase error
   * the return type will be forced to update our function to return a Boolean value.
   *  - -- one solution is add double negation operator !!.
   *  - -- An alternative solution is to wrap the value with the Boolean function. .
   */
  isModalOpen(id: string): boolean {
    // return !!this.modals.find((element) => element.id === id)?.visible;
    return Boolean(this.modals.find((element) => element.id === id)?.visible);
  }

  toggleModal(id: string) {
    const modal = this.modals.find((element) => element.id === id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }
}
