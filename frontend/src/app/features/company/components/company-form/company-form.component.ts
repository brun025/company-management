import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../../core/services/company.service';
import { Company } from '../../../../core/models/company.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CnpjValidator } from '../../../../core/validators/cnpj.validator';
import { PhoneValidator } from '../../../../core/validators/phone.validator';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    NgxMaskDirective,
    TranslateModule
  ],
  providers: [provideNgxMask()]
})
export class CompanyFormComponent implements OnInit {
  form: FormGroup;
  isEditing = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<CompanyFormComponent>,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { company?: Company }
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      cnpj: ['', [Validators.required, CnpjValidator.validate]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, PhoneValidator.validate]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.data?.company) {
      this.isEditing = true;
      this.form.patchValue(this.data.company);
    }
  }

  onSubmit(): void {
    if (this.form.valid && !this.submitting) {
      this.submitting = true;
      const company = this.form.value;
      
      const request = this.isEditing && this.data.company?.id
        ? this.companyService.updateCompany(this.data.company.id, company)
        : this.companyService.createCompany(company);
  
      request.subscribe({
        next: () => {
          const messageKey = this.isEditing 
            ? 'COMPANY.MESSAGES.UPDATE_SUCCESS'
            : 'COMPANY.MESSAGES.CREATE_SUCCESS';
            
          this.toastr.success(this.translate.instant(messageKey));
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.toastr.error(`${this.translate.instant('COMPANY.MESSAGES.ERROR')}, ${error.error.message}`);
          this.submitting = false;
        }
      });
    }
  }
}