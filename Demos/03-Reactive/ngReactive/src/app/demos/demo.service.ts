import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DemoItem } from '../model/demo/DemoItem';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  constructor(private httpClient: HttpClient) {}

  getItems(): Observable<DemoItem[]> {
    return this.httpClient
      .get<DemoItem[]>(`${environment.apiUrl}demos`)
      .pipe(shareReplay());
  }
}
