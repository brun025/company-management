import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';

@NgModule({
  imports: [
    CommonModule,
    CompanyListComponent,
    CompanyFormComponent
  ]
})
export class CompanyModule { }