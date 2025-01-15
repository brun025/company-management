import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { PaginatedResponse } from '../models/pagination.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    private readonly apiUrl = `${environment.apiUrl}/companies`;

    constructor(private http: HttpClient) { }

    getCompanies(page: number = 1, limit: number = 10): Observable<PaginatedResponse<Company>> {
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());

        return this.http.get<PaginatedResponse<Company>>(this.apiUrl, { params });
    }

    getCompany(id: number): Observable<Company> {
        return this.http.get<Company>(`${this.apiUrl}/${id}`);
    }

    createCompany(company: Company): Observable<Company> {
        return this.http.post<Company>(this.apiUrl, company);
    }

    updateCompany(id: number, company: Company): Observable<Company> {
        return this.http.put<Company>(`${this.apiUrl}/${id}`, company);
    }

    deleteCompany(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}