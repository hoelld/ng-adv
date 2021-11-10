import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { filterEven } from './filterEven';
import { getFromApi, logError } from './logErr';
import { pow } from './pow';
import { takeEveryNth } from './takeEveryNth';

@Component({
  selector: 'app-custom-operators',
  templateUrl: './custom-operators.component.html',
  styleUrls: ['./custom-operators.component.scss'],
})
export class CustomOperatorsComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  response: any;

  private readonly url = 'https://jsonplaceholder.typicode.com/todos/1';

  ngOnInit() {}

  simpleFilter() {
    const numbers$ = from([1, 4, 6, 7, 9, 11]).pipe((n) => filterEven(n));
    numbers$.subscribe((n) => console.log(n));
  }

  usePow() {
    const numbers$ = from([1, 4, 6, 7, 9, 11]).pipe(pow(2));
    numbers$.subscribe((n) => console.log(n));
  }


  usingOperators() {
    const numbers$ = from([1, 4, 6, 7, 9, 11]).pipe(takeEveryNth(3));
    numbers$.subscribe((n) => console.log(n));
  }

  errHandling() {
    // traditional rest call
    this.httpClient
      .get(this.url)
      .pipe(
        catchError((err) => {
          console.log('Error', err);
          return EMPTY;
        })
      )
      .subscribe((data) => console.log('result from api', data));

    // traditional rest call
    this.httpClient
      .get(this.url)
      .pipe(logError())
      .subscribe((data) => console.log('result from api', data));
  }

  utilFunction() {
    getFromApi(this.httpClient, this.url).subscribe((data) =>
      console.log('result from api', data)
    );
  }

  resolveParentChild() {}
}
