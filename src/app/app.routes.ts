import { Routes } from '@angular/router';
import { ButtonComponent } from '../buttoncomponent/button.component';
import { FormComponent } from '../formcomponent/form.component';

export const routes: Routes = [
  { path: '', component: ButtonComponent },
  { path: 'readmeform', component: FormComponent },
];
