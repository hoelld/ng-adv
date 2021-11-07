import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from './author';
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';

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