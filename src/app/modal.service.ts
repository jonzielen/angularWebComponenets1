import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ModalService {
  modalData: object;
  modal = document.createElement('alert-component');

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onLaunchModal(title: string, body: string, component) {

    // check if alert-component is already in DOM
    if (!document.getElementsByTagName('alert-component')[0]) {

      const alert = this.modal;

      // Create the component and wire it up with the element
      const factory = this.componentFactoryResolver.resolveComponentFactory(component);
      const alertComponentRef = factory.create(this.injector, [], alert);

      // Attach to the view so that the change detector knows to run
      this.applicationRef.attachView(alertComponentRef.hostView);

      // Add to the DOM
      document.body.appendChild(alert);
    }

    this.modalData = {
      title: title,
      body: body
    };
  }

  getModalData() {
    return this.modalData;
  }

  removeModal() {
    this.modal.remove(); // use renderer2?
  }
}
