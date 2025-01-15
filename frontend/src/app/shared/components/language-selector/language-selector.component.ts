import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  template: `
    <div class="flex items-center space-x-2">
      <button 
        *ngFor="let lang of languages"
        (click)="changeLanguage(lang.code)"
        [class.font-bold]="currentLang === lang.code"
        class="px-2 py-1 text-sm rounded hover:bg-gray-100">
        {{ lang.name }}
      </button>
    </div>
  `,
  standalone: true
})
export class LanguageSelectorComponent {
  languages = [
    { code: 'pt-BR', name: 'PT' },
    { code: 'en', name: 'EN' }
  ];

  get currentLang() {
    return this.translate.currentLang;
  }

  constructor(private translate: TranslateService) {}

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}