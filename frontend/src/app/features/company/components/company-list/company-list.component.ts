import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../../core/services/company.service';
import { Company } from '../../../../core/models/company.model';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    FontAwesomeModule,
    TranslateModule,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  loading = false;
  totalItems = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25, 50];
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.companyService.getCompanies(this.currentPage + 1, this.pageSize)
      .subscribe({
        next: (response) => {
          this.companies = response.data;
          this.totalItems = response.meta.itemCount;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading companies:', error);
          this.toastr.error(this.translate.instant('COMMON.DATA_LOADING_ERROR'));
          this.loading = false;
        }
      });
  }

  openCompanyForm(company?: Company): void {
    const dialogRef = this.dialog.open(CompanyFormComponent, {
      width: '90%',
      maxWidth: '500px',
      data: { company }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success(company ? this.translate.instant('COMPANY.MESSAGES.UPDATE_SUCCESS') : this.translate.instant('COMPANY.MESSAGES.CREATE_SUCCESS'));
        this.loadCompanies();
      }
    });
  }

  deleteCompany(company: Company): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      maxWidth: '400px',
      data: {
        title: this.translate.instant('COMMON.DELETE_CONFIRM'),
        message: `${this.translate.instant('COMPANY.MESSAGES.CONFIRM_DELETE')} ${company.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && company.id) {
        this.companyService.deleteCompany(company.id)
          .subscribe({
            next: () => {
              this.toastr.success(this.translate.instant('COMPANY.MESSAGES.DELETE_SUCCESS'));
              this.loadCompanies();
            },
            error: (error) => {
              console.error('Error deleting company:', error);
              this.toastr.error(this.translate.instant('COMPANY.MESSAGES.ERROR'));
            }
          });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompanies();
  }
}