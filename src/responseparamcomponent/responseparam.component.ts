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
  templateUrl: './responseparam.component.html',
  styleUrl: './responseparam.component.css',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
})
export class ResponseParamComponent {
  // ResponseParam Object Structure Start
  responseParamMap = new Map<number, any>();

  responseParam = {
    field: '',
    type: '',
    description: '',
  };

  // Response Param Object Structure End

  @Output() responseParamEmitter = new EventEmitter();
  @Input() responseParamCount: number = 0;

  inputChange(): void {
    this.responseParamMap.set(this.responseParamCount, this.responseParam);
    this.responseParamEmitter.emit(this.responseParamMap);
  }
}
