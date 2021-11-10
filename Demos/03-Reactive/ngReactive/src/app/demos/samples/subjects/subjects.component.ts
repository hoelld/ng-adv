import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  constructor() {}

  sub$: Subject<number> = new Subject<number>();
  bs$: BehaviorSubject<number> = new BehaviorSubject<number>(-1); // -1 is initialization value - requires
  rs$: ReplaySubject<number> = new ReplaySubject<number>(2); // 2 is number of replay subjects
  as$: AsyncSubject<number> = new AsyncSubject();

  ngOnInit() {
    // this.runSubjectInit();
    // this.runBSubjectInit();
    // this.runRPSubjectInit();
     this.runASubjectInit();
  }

  private runSubjectInit() {
    console.log('init subject');
    this.sub$.subscribe((val) => console.log('Subsciber A', val));
    this.sub$.subscribe((val) => console.log('Subsciber B', val));
    this.sub$.next(10);
  }

  emitNext() {
    this.sub$.subscribe((val) => console.log('Subsciber Late', val));
    this.sub$.next(20);
  }

  private runBSubjectInit() {
    console.log('init behaviour subject');
    this.bs$.next(0);
    this.bs$.subscribe((val) => console.log('BS Subsciber A', val));
    this.bs$.subscribe((val) => console.log('BS Subsciber B', val));
    this.bs$.next(10);
  }

  emitNextBS() {
    this.bs$.subscribe((val) => console.log('Subsciber Late', val));
    this.bs$.next(20);
  }

  private runRPSubjectInit() {
    console.log('init replay subject');
    this.rs$.next(0);
    this.rs$.subscribe((val) => console.log('RS Subsciber A', val));
    this.rs$.subscribe((val) => console.log('RS Subsciber B', val));
    this.rs$.next(10);
  }

  emitNextRS() {
    this.rs$.subscribe((val) => console.log('Subsciber Late', val));
    this.rs$.next(20);
  }

  private runASubjectInit() {
    console.log('init async subject');
    this.as$.next(0);
    this.as$.subscribe((val) => console.log('RS Subsciber A', val));
    this.as$.subscribe((val) => console.log('RS Subsciber B', val));
    this.as$.next(10);
  }

  emitNextAS() {
    this.as$.subscribe((val) => console.log('Subsciber Late', val));
    
  }

  completeAS() {
    console.log('complete');
    this.as$.complete();
  }
}
