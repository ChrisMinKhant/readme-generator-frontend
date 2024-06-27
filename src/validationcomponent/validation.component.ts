import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'validation',
  standalone: true,
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class ValidationComponent {
  // Request Param Object Structure Start
  validationMap = new Map<number, any>();

  validation = {
    name: '',
    description: '',
  };

  // Request Param Object Structure End

  @Output() validationEmitter = new EventEmitter();
  @Input() validationCount: number = 0;

  inputChange(): void {
    this.validationMap.set(this.validationCount, this.validation);
    this.validationEmitter.emit(this.validationMap);
  }
}
