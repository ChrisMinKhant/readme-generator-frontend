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
import { ResponseParamComponent } from '../responseparamcomponent/responseparam.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'endpoint-form',
  imports: [
    RequestParamComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './endpointform.component.html',
  styleUrl: './endpointform.component.css',
})
export class EndpointFormComponent {
  // Endpoint Object Structure Start
  endpointMap = new Map<number, any>();
  requestParamMap = new Map<number, any>();
  responseParamMap = new Map<number, any>();

  endpoint = {
    path: '',
    description: '',
    exampleRequest: '',
    exampleResponse: '',
    requestParams: Array.of(),
    responseParams: Array.of(),
  };
  // Endpoint Object Structure End

  @Output() endpointInfoEmitter = new EventEmitter();

  faPlus: IconDefinition = faPlus;
  @Input() endpointCount: number = 0;

  componentRef: ComponentRef<any> = null as any;
  requestParamCount: number = 0;
  responseParamCount: number = 0;

  @ViewChild('requestparam', { read: ViewContainerRef })
  requestParamTarget: ViewContainerRef = null as any;

  @ViewChild('responseparam', { read: ViewContainerRef })
  responseParamTarget: ViewContainerRef = null as any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addRequestElement(): void {
    this.requestParamCount++;

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      RequestParamComponent
    );

    this.componentRef = this.requestParamTarget.createComponent(childComponent);
    this.componentRef.setInput('requestParamCount', this.requestParamCount);

    // Subcribe to emitted event of loaded component
    this.componentRef.instance.requestParamEmitter.subscribe(
      (emittedEvent: any) => this.emittedRequestParamInfo(emittedEvent)
    );
  }

  addResponseElement(): void {
    this.responseParamCount++;

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      ResponseParamComponent
    );

    this.componentRef = this.responseParamTarget.createComponent(childComponent);
    this.componentRef.setInput('responseParamCount', this.responseParamCount);

    this.componentRef.instance.responseParamEmitter.subscribe(
      (emittedEvent: any) => this.emittedResponseParamInfo(emittedEvent)
    );
  }

  inputChange(): void {
    this.endpointMap.set(this.endpointCount, this.endpoint);

    this.endpointInfoEmitter.emit(this.endpointMap);
  }

  emittedRequestParamInfo(event: Map<number, any>): void {
    // Check if there is any value with emitted key in endpoint map
    this.requestParamMap.forEach((value, key) => {
      event.forEach((eventValue, eventKey) => {
        if (key == eventKey) {
          this.requestParamMap.set(key, eventValue);
          return;
        }
      });
    });

    // if not push new (key,valye) pair to endpoint map
    event.forEach((eventValue, eventKey) => {
      this.requestParamMap.set(eventKey, eventValue);
    });

    this.endpoint.requestParams = Array.from(this.requestParamMap.values());

    this.endpointMap.set(this.endpointCount, this.endpoint);

    this.endpointInfoEmitter.emit(this.endpointMap);
  }

  emittedResponseParamInfo(event: Map<number, any>): void {
    // Check if there is any value with emitted key in endpoint map
    this.responseParamMap.forEach((value, key) => {
      event.forEach((eventValue, eventKey) => {
        if (key == eventKey) {
          this.responseParamMap.set(key, eventValue);
          return;
        }
      });
    });

    // if not push new (key,valye) pair to endpoint map
    event.forEach((eventValue, eventKey) => {
      this.responseParamMap.set(eventKey, eventValue);
    });

    this.endpoint.responseParams = Array.from(this.responseParamMap.values());

    this.endpointMap.set(this.endpointCount, this.endpoint);

    this.endpointInfoEmitter.emit(this.endpointMap);
  }
}
