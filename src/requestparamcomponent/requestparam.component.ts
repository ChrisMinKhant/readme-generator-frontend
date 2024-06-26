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

  requestParamField = '';
  requestParamType = '';
  requestParamDescription = '';

  requestParam = {
    requestParamField: '',
    requestParamType: '',
    requestParamDescription: '',
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
  }

  inputChange(): void {
    this.requestParamMap.set(
      this.requestParamCount,
      (this.requestParam = {
        requestParamField: this.requestParamField,
        requestParamType: this.requestParamType,
        requestParamDescription: this.requestParamDescription,
      })
    );

    this.requestParamEmitter.emit(this.requestParamMap);
  }
}
