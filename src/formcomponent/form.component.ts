import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EndpointFormComponent } from '../endpointformcomponent/endpointform.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'next',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports: [EndpointFormComponent, FontAwesomeModule],
})
export class FormComponent {
  faPlus:IconDefinition = faPlus;
  componentRef:ComponentRef<any> = null as any;
  endpointCount:number = 0

  @ViewChild('endpointform', { read: ViewContainerRef })
  target: ViewContainerRef = null as any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addElement() {
    this.endpointCount++;

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      EndpointFormComponent
    );

    this.componentRef = this.target.createComponent(childComponent);
    this.componentRef.setInput("endpointCount",this.endpointCount)
  }
}
