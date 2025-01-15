import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Não mostrar loader para algumas requisições específicas se necessário
    // if (request.url.includes('some-endpoint')) {
    //   return next.handle(request);
    // }

    this.loaderService.show();

    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loaderService.hide();
        }, 0);
      })
    );
  }
}