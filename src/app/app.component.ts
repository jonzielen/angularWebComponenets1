import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from './modal.service';

import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('title', {static: false}) title: ElementRef;
  @ViewChild('body', {static: false}) body: ElementRef;

  constructor(private modalService: ModalService) {}

  onButtonClick() {
    let title = this.title.nativeElement.value || 'Modal Title';
    let body = this.body.nativeElement.value || '<h3>Modal Body Test</h3><p>Test paragraph, goes here.</p>';

    this.modalService.onLaunchModal(title, body, AlertComponent);
  }
}
