import { Component, Input } from '@angular/core';

@Component({
  selector: 'validation',
  standalone: true,
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css',
})
export class ValidationComponent {
  @Input() validationCount: number = 0;
}
