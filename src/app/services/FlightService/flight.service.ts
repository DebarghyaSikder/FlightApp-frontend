import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightService {

  private baseUrl = environment.apiBaseUrl + '/api/flights';

  constructor(private http: HttpClient) {}

  searchFlights(payload: {
    fromPlace: string;
    toPlace: string;
    departureDate: string;
  }): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/search`, payload);
  }
}
