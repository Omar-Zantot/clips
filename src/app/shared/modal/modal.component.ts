import { Component, Input, ElementRef, OnInit } from '@angular/core';
// The Element Ref object gives us access to the host element of our component.
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // providers: [ModalService], component level
})
export class ModalComponent implements OnInit {
  @Input() modalID = '';
  constructor(public modal: ModalService, public el: ElementRef) {}

  ngOnInit(): void {
    // CSS issues can be stops us
    document.body.appendChild(this.el.nativeElement);
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }
}

/**
 * Our main objective is to transfer the element from its current location to
 * the documents route, which is the body tag before we can move the element.
 * We need to grab it
 */

/**
 * Previously, we would pass on the event, object to the function by passing on
 * this object.We could call the prevent default function from preventing the default behavior.
 * However, we're going to be applying our click listeners to div tags.
 * Clicks on div tags will not cause the browser to redirect the user to
 * a different page.Therefore, it's safe not to call this method.
 * We can save ourselves the time of calling B prevent default method.
 */
