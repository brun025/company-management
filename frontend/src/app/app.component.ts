import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-loader *ngIf="loaderService.isLoading$ | async"></app-loader>
  `,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    LoaderComponent
  ]
})
export class AppComponent implements AfterContentChecked {
  loading = false;

  constructor(
    private translate: TranslateService,
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    translate.setDefaultLang('pt-BR');
    translate.use('pt-BR');

    this.loaderService.isLoading$.subscribe(
      isLoading => this.loading = isLoading
    );
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}