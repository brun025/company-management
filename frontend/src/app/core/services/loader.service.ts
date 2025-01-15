import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private requestCount = 0;

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.isLoadingSubject.next(true);
    }
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }

  reset(): void {
    this.requestCount = 0;
    this.isLoadingSubject.next(false);
  }
}