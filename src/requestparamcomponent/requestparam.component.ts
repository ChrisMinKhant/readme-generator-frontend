import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ValidationComponent } from '../validationcomponent/validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'request-param-form',
  standalone: true,
  templateUrl: './requestparam.component.html',
  styleUrl: './requestparam.component.css',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
})
export class RequestParamComponent {
  // Request Param Object Structure Start
  requestParamMap = new Map<number, any>();
  validationMap = new Map<number, any>();

  requestParam = {
    field: '',
    type: '',
    description: '',
    validations: Array.of(),
  };

  // Request Param Object Structure End

  @Output() requestParamEmitter = new EventEmitter();
  @Input() requestParamCount: number = 0;

  faPlus: IconDefinition = faPlus;
  componentRef: ComponentRef<any> = null as any;
  validationCount: number = 0;

  @ViewChild('validation', { read: ViewContainerRef })
  target: ViewContainerRef = null as any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addElement(): void {
    this.validationCount++;

    let childComponent =
      this.componentFactoryResolver.resolveComponentFactory(
        ValidationComponent
      );

    this.componentRef = this.target.createComponent(childComponent);
    this.componentRef.setInput('validationCount', this.validationCount);
    this.componentRef.instance.validationEmitter.subscribe(
      (emittedEvent: any) => {
        this.emittedValidation(emittedEvent);
      }
    );
  }

  inputChange(): void {
    this.requestParamMap.set(this.requestParamCount, this.requestParam);
    this.requestParamEmitter.emit(this.requestParamMap);
  }

  emittedValidation(event: Map<number, any>) {
    // Check if there is any value with emitted key in endpoint map
    this.validationMap.forEach((value, key) => {
      event.forEach((eventValue, eventKey) => {
        if (key == eventKey) {
          this.validationMap.set(key, eventValue);
          return;
        }
      });
    });

    // if not push new (key,valye) pair to endpoint map
    event.forEach((eventValue, eventKey) => {
      this.validationMap.set(eventKey, eventValue);
    });

    this.requestParam.validations = Array.from(this.validationMap.values());
    this.requestParamMap.set(this.requestParamCount, this.requestParam);
    this.requestParamEmitter.emit(this.requestParamMap);
  }
}
