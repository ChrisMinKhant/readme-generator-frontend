import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { EndpointFormComponent } from '../endpointformcomponent/endpointform.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { timeStamp } from 'node:console';
import { RestApiService } from '../services/RestApiService/RestApiService';

@Component({
  selector: 'next',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports: [
    EndpointFormComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormComponent {
  // Object Structure Start
  endpointMap = new Map<number, any>();

  readMeInfo = {
    serviceName: '',
    serviceCategory: '',
    serviceDescription: '',
    generationDirectory: '',
    endpoints: Array.of(),
  };
  // Object Structure End

  faPlus: IconDefinition = faPlus;
  componentRef: ComponentRef<any> = null as any;
  endpointCount: number = 0;

  @ViewChild('endpointform', { read: ViewContainerRef })
  target: ViewContainerRef = null as any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private apiService: RestApiService
  ) {}

  addElement(): void {
    this.endpointCount++;

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      EndpointFormComponent
    );

    this.componentRef = this.target.createComponent(childComponent);
    this.componentRef.setInput('endpointCount', this.endpointCount);

    // Subcribe to emitted event of loaded component
    this.componentRef.instance.endpointInfoEmitter.subscribe(
      (emittedEvent: any) => this.emittedEndpointInfo(emittedEvent)
    );
  }

  emittedEndpointInfo(event: Map<number, any>): void {
    // Check if there is any value with emitted key in endpoint map
    this.endpointMap.forEach((value, key) => {
      event.forEach((eventValue, eventKey) => {
        if (key == eventKey) {
          this.endpointMap.set(key, eventValue);
          return;
        }
      });
    });

    // if not push new (key,valye) pair to endpoint map
    event.forEach((eventValue, eventKey) => {
      this.endpointMap.set(eventKey, eventValue);
    });
  }

  submitForm(): void {
    this.readMeInfo.endpoints = Array.from(this.endpointMap.values());
    this.apiService.submitReadMeInfoForm(JSON.stringify(this.readMeInfo));
  }
}
