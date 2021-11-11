import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Author } from './author';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.httpClient
    .get<Author[]>(environment.apiUrl + "authors")
    .pipe(tap(data => console.log("data from api", data)));
  }
}
