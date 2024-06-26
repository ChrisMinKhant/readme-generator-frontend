import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RequestParamComponent } from '../requestparamcomponent/requestparam.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'endpoint-form',
  imports: [
    RequestParamComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './endpointform.component.html',
  styleUrl: './endpointform.component.css',
})
export class EndpointFormComponent {
  // Endpoint Object Structure Start
  endpointMap = new Map<number, any>();
  requestParamMap = new Map<string, any>();

  endpointPath: string = '';
  endpointDescription: string = '';
  exampleRequest: string = '';
  exampleResponse: string = '';

  endpoint = {
    endpointPath: '',
    endpointDescription: '',
    exampleRequest: '',
    exampleResponse: '',
    requestParams: [],
  };
  // Endpoint Object Structure End

  @Output() endpointInfoEmitter = new EventEmitter();

  faPlus: IconDefinition = faPlus;
  @Input() endpointCount: number = 0;

  componentRef: ComponentRef<any> = null as any;
  requestParamCount: number = 0;

  @ViewChild('requestparam', { read: ViewContainerRef })
  target: ViewContainerRef = null as any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addElement(): void {
    this.requestParamCount++;

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      RequestParamComponent
    );

    this.componentRef = this.target.createComponent(childComponent);
    this.componentRef.setInput('requestParamCount', this.requestParamCount);
  }

  inputChange(): void {
    this.endpointMap.set(
      this.endpointCount,
      (this.endpoint = {
        endpointPath: this.endpointPath,
        endpointDescription: this.endpointDescription,
        exampleRequest: this.exampleRequest,
        exampleResponse: this.exampleResponse,
        requestParams: [],
      })
    );

    this.endpointInfoEmitter.emit(this.endpointMap);
  }
}
