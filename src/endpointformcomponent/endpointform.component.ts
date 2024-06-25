import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RequestParamComponent } from '../requestparamcomponent/requestparam.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'endpoint-form',
  imports:[RequestParamComponent,FontAwesomeModule],
  standalone: true,
  templateUrl: './endpointform.component.html',
  styleUrl: './endpointform.component.css',
})

export class EndpointFormComponent {
  faPlus:IconDefinition = faPlus
  @Input() endpointCount: number = 0;

  componentRef: ComponentRef<any> = null as any;
  requestParamCount: number = 0;

  @ViewChild('requestparam', { read: ViewContainerRef })
  target: ViewContainerRef = null as any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addElement() {
    this.requestParamCount++;

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      RequestParamComponent
    );

    this.componentRef = this.target.createComponent(childComponent);
    this.componentRef.setInput('requestParamCount', this.requestParamCount);
  }
}
