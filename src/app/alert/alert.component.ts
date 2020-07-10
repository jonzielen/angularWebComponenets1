import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ElementRef } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, AfterViewInit {
  showModal = false;
  modalTitle: string;
  modalMessage: string;
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('modalBackdrop', {static: false}) modalBackdrop: ElementRef;
  @ViewChild('modalDialog', {static: false}) modalDialog: ElementRef;

  constructor(
    private modalService: ModalService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    let modalData = this.modalService.getModalData();
    console.log('modalData: ', modalData);

    this.modalTitle = modalData['title'];
    this.modalMessage = modalData['body'];
    this.showModal = true;
  }

  ngAfterViewInit() {
    // add classes to fade in modal
    this.renderer.addClass(this.modal.nativeElement, 'fade');
    this.renderer.addClass(this.modalBackdrop.nativeElement, 'fade');
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');

    // add event to remove modal on background click
    this.renderer.listen(this.modal.nativeElement, 'click', (event: Event) => {
      this.onCloseModal();
    });

    // prevent modal close on modal dialog click
    this.renderer.listen(this.modalDialog.nativeElement, 'click', (event: Event) => {
      event.stopPropagation();
    });

    // add classes to show modal
    setTimeout(() => {
      this.renderer.addClass(this.modal.nativeElement, 'show');
      this.renderer.addClass(this.modalBackdrop.nativeElement, 'show');
    }, 20);
  }

  onCloseModal() {
    // remove classes to show modal
    this.renderer.removeClass(this.modal.nativeElement, 'show');
    this.renderer.removeClass(this.modalBackdrop.nativeElement, 'show');

    // remove modal from display/DOM
    setTimeout(() => {
      this.showModal = false;
      this.modalService.removeModal();
    }, 250);
  }
}
