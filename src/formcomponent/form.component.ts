import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EndpointFormComponent } from '../endpointformcomponent/endpointform.component';

@Component({
  selector: 'next',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports: [EndpointFormComponent],
})
export class FormComponent {
  @ViewChild('endpointform', { read: ViewContainerRef })
  target!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  componentRef!: ComponentRef<any>;

  addElement() {
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      EndpointFormComponent
    );

    this.componentRef = this.target.createComponent(childComponent);
  }
}
