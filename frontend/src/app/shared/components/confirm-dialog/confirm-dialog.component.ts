import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">{{ data.title | translate }}</h2>
      <p class="mb-6 text-gray-600">{{ data.message | translate:data.params }}</p>
      
      <div class="flex justify-end space-x-4">
        <button 
          mat-button
          (click)="dialogRef.close(false)"
          class="px-4 py-2 text-gray-600 hover:text-gray-800">
          {{ 'COMMON.CANCEL' | translate }}
        </button>
        <button 
          mat-raised-button
          color="warn"
          (click)="dialogRef.close(true)"
          class="px-4 py-2 bg-red-600 text-white hover:bg-red-700">
          {{ 'COMMON.CONFIRM' | translate }}
        </button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, TranslateModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
      params?: { [key: string]: string };
    }
  ) {}
}