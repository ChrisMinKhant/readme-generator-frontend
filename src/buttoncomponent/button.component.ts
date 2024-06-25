import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'next',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  constructor(private router: Router) {}
  routeReadMeForm(): void {
    this.router.navigate(['/readmeform']);
  }
}
