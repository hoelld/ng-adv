import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root'  // if only used in lazy loaded module means the service is also lazy loaded.
})
export class SkillsService {

  constructor(private httpClient: HttpClient) { }

  getSkills(): Observable<Skill[]> {
    return this.httpClient
      .get<Skill[]>(environment.apiUrl + "skills")
      .pipe(tap(data => console.log("data from api", data)));
  }

  addSkill(skill:Skill): Observable<Skill> {
    return this.httpClient
      .post<Skill>(environment.apiUrl + "skills", skill).pipe(
        tap(data => console.log("addSkill data from api", data))
        );   
  }
}
