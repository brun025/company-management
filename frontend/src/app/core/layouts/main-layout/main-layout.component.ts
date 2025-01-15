import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

interface User {
  name: string;
  email: string;
  id: number;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
  ], 
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  user!: User;
  languages = [
    { code: 'pt-BR', name: 'Português' },
    { code: 'en', name: 'English' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('pt-BR');
    translate.use('pt-BR');
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('Logout realizado com sucesso');
    this.router.navigate(['/login']);
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  changeLanguage(langCode: string): void {
    this.translate.use(langCode);
  } 
}